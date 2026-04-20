import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().min(1, 'Phone number is required.'),
  address: z.string().min(1, 'Address is required.'),
  dob: z.string().min(1, 'Date of birth is required.'),
  gender: z.string().min(1, 'Please select a gender.'),
  emergencyName: z.string().min(1, 'Contact name is required.'),
  emergencyRelationship: z.string().min(1, 'Relationship is required.'),
  emergencyPhone: z.string().min(1, 'Phone is required.'),
});

type FormValues = z.infer<typeof schema>;

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA',
      dob: '1990-05-15',
      gender: 'male',
      emergencyName: 'Jane Doe',
      emergencyRelationship: 'Spouse',
      emergencyPhone: '+1 (555) 987-6543',
    },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to user API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="edit-profile-page"
    >
      <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/profile"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="edit-profile-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Profile
          </Link>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Edit Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update your personal information and preferences.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-semibold text-slate-600 border-2 border-white shadow-lg">
                JD
              </div>
              <button data-testid="edit-profile-photo-overlay-btn"
                type="button"
                onClick={() => {
                  /* open photo picker */
                }}
                className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Edit photo"
              >
                Edit
              </button>
            </div>
            <div className="flex-1">
              <div className="flex gap-3">
                <button data-testid="edit-profile-upload-btn"
                  type="button"
                  onClick={() => {
                    /* upload */
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Upload New Photo
                </button>
                <button data-testid="edit-profile-remove-btn"
                  type="button"
                  onClick={() => {
                    /* remove */
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Recommended: Square image, at least 400x400px. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-sm font-semibold text-slate-900 mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    First Name
                  </label>
                  <input data-testid="edit-profile-firstname-input"
                    type="text"
                    id="first-name"
                    className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                    {...register('firstName')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Last Name
                  </label>
                  <input data-testid="edit-profile-lastname-input"
                    type="text"
                    id="last-name"
                    className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                    {...register('lastName')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address
                  <span className="text-xs font-normal text-slate-400 ml-1">
                    (Cannot be changed)
                  </span>
                </label>
                <input data-testid="edit-profile-email-input"
                  type="email"
                  id="email"
                  value="john.doe@potentialai.com"
                  disabled
                  readOnly
                  className="block w-full h-11 px-3 text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input data-testid="edit-profile-phone-input"
                  type="tel"
                  id="phone"
                  className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  {...register('phone')}
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Address
                </label>
                <input data-testid="edit-profile-address-input"
                  type="text"
                  id="address"
                  className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  {...register('address')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Date of Birth
                  </label>
                  <input data-testid="edit-profile-dob-input"
                    type="date"
                    id="dob"
                    className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                    {...register('dob')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Gender
                  </label>
                  <select data-testid="edit-profile-gender-select"
                    id="gender"
                    className="block w-full h-11 px-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                    {...register('gender')}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-sm font-semibold text-slate-900 mb-6">Emergency Contact</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="emergency-name"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Contact Name
                  </label>
                  <input data-testid="edit-profile-emergency-name-input"
                    type="text"
                    id="emergency-name"
                    className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                    {...register('emergencyName')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergency-relationship"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Relationship
                  </label>
                  <input data-testid="edit-profile-emergency-relationship-input"
                    type="text"
                    id="emergency-relationship"
                    className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                    {...register('emergencyRelationship')}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="emergency-phone"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Phone Number
                </label>
                <input data-testid="edit-profile-emergency-phone-input"
                  type="tel"
                  id="emergency-phone"
                  className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  {...register('emergencyPhone')}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              to="/employee/profile"
              className="h-11 px-5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
              data-testid="edit-profile-cancel-link"
            >
              Cancel
            </Link>
            <button data-testid="edit-profile-save-btn"
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
