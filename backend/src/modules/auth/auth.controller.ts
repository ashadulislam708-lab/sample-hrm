import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Public } from '../../core/decorators/public.decorator';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthResponseDto, MessageResponseDto } from './dtos/auth-response.dto';
import { SetTokenInterceptor } from './interceptors/set-token.interceptor';
import { RemoveTokenInterceptor } from './interceptors/remove-token.interceptor';
import { UserService } from '../users/user.service';
import { UserResponseDto } from '../users/dtos/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('login')
  @UseInterceptors(SetTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Email + password login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful — tokens set as httpOnly cookies',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
  ): Promise<AuthResponseDto> {
    return this.authService.login(dto.email, dto.password, ip ?? null);
  }

  @Public()
  @Post('logout')
  @UseInterceptors(RemoveTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out — clears auth cookies' })
  @ApiResponse({ status: 200, description: 'Logout successful', type: MessageResponseDto })
  async logout(@Req() req: Request): Promise<MessageResponseDto> {
    const refreshName =
      this.configService.get<string>('cookie.refreshName') ?? 'refresh_token';
    const cookies = (req.cookies ?? {}) as Record<string, string>;
    await this.authService.logout(cookies[refreshName]);
    return { message: 'Logged out successfully' };
  }

  @Public()
  @Post('refresh')
  @UseInterceptors(SetTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate access and refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Tokens rotated — new pair set as httpOnly cookies',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid / expired refresh token' })
  async refresh(
    @Req() req: Request,
    @Ip() ip: string,
  ): Promise<AuthResponseDto> {
    const refreshName =
      this.configService.get<string>('cookie.refreshName') ?? 'refresh_token';
    const cookies = (req.cookies ?? {}) as Record<string, string>;
    const refreshToken = cookies[refreshName];
    return this.authService.refresh(refreshToken, ip ?? null);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Send password-reset email' })
  @ApiResponse({ status: 204, description: 'Reset email queued (always 204)' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<void> {
    await this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using emailed token' })
  @ApiResponse({ status: 200, description: 'Password reset', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid / expired token or password mismatch' })
  async resetPassword(
    @Body() dto: ResetPasswordDto,
  ): Promise<MessageResponseDto> {
    await this.authService.resetPassword(
      dto.token,
      dto.password,
      dto.confirmPassword,
    );
    return { message: 'Password reset successful' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Authenticated user', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(
    @CurrentUser() current: AuthenticatedUser,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByIdOrFail(current.id);
    return UserResponseDto.fromEntity(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change own password (authenticated user)' })
  @ApiResponse({ status: 200, description: 'Password updated', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error / mismatch' })
  @ApiResponse({ status: 401, description: 'Invalid current password' })
  async changePassword(
    @CurrentUser() current: AuthenticatedUser,
    @Body() dto: ChangePasswordDto,
  ): Promise<MessageResponseDto> {
    await this.authService.changePassword(
      current.id,
      dto.currentPassword,
      dto.newPassword,
      dto.confirmPassword,
    );
    return { message: 'Password changed successfully' };
  }
}
