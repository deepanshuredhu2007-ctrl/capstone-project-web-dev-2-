import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type JobStatus = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  companyName: string;
  jobRole: string;
  applicationStatus: JobStatus;
  jobPlatform: string;
  location: string;
  salary: string;
  appliedDate: string;
  notes: string;
}

interface JobState {
  applications: JobApplication[];
  isLoading: boolean;
  error: string | null;
}

const initialApplications: JobApplication[] = [
  {
    id: '1',
    companyName: 'Google',
    jobRole: 'Software Engineer',
    applicationStatus: 'Interviewing',
    jobPlatform: 'LinkedIn',
    location: 'Mountain View, CA',
    salary: '$180,000',
    appliedDate: '2023-10-15',
    notes: 'Prepped for technical rounds.',
  },
  {
    id: '2',
    companyName: 'Meta',
    jobRole: 'Frontend Developer',
    applicationStatus: 'Applied',
    jobPlatform: 'Company Website',
    location: 'Remote',
    salary: '$165,000',
    appliedDate: '2023-11-01',
    notes: 'Applied with referral.',
  },
  {
    id: '3',
    companyName: 'Stripe',
    jobRole: 'Full Stack Engineer',
    applicationStatus: 'Offer',
    jobPlatform: 'Glassdoor',
    location: 'Seattle, WA',
    salary: '$195,000',
    appliedDate: '2023-09-20',
    notes: 'Offer received on Nov 5th.',
  },
  {
    id: '4',
    companyName: 'Amazon',
    jobRole: 'Backend Engineer',
    applicationStatus: 'Rejected',
    jobPlatform: 'LinkedIn',
    location: 'Vancouver, BC',
    salary: '$140,000',
    appliedDate: '2023-08-10',
    notes: 'Ghosted after 1st round.',
  }
];

const initialState: JobState = {
  applications: initialApplications,
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<JobApplication>) => {
      state.applications.unshift(action.payload);
    },
    updateJob: (state, action: PayloadAction<JobApplication>) => {
      const index = state.applications.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter(job => job.id !== action.payload);
    },
    setJobs: (state, action: PayloadAction<JobApplication[]>) => {
      state.applications = action.payload;
    },
  },
});

export const { addJob, updateJob, deleteJob, setJobs } = jobSlice.actions;
export default jobSlice.reducer;