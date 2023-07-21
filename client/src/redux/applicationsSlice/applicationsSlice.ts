import { createSlice } from '@reduxjs/toolkit'
import { type ProjectTeam } from '../projectTeamsSlice/projectTeamsSlice'
import { assignDeveloperApplicationToProjectTeam } from './thunks/assignDeveloperApplicationToProjectTeam'
import {
  createInstructorCommentForDeveloperApplication,
  createInstructorCommentForCoachApplication,
  createInstructorCommentForTutorApplication,
} from './thunks/createInstructorComment'
import {
  fetchDeveloperApplications,
  fetchCoachApplications,
  fetchTutorApplications,
} from './thunks/fetchApplications'
import { removeDeveloperApplicationFromProjectTeam } from './thunks/removeDeveloperApplicationFromProjectTeam'
import { updateDeveloperApplication } from './thunks/updateDeveloperApplication'
import {
  updateCoachApplicationAssessment,
  updateDeveloperApplicationAssessment,
  updateTutorApplicationAssessment,
} from './thunks/updateApplicationAssessment'
import {
  deleteCoachApplication,
  deleteDeveloperApplication,
  deleteTutorApplication,
} from './thunks/deleteApplication'
import {
  sendCoachInterviewInvitation,
  sendTutorInterviewInvitation,
} from './thunks/sendInterviewInvitation'
import {
  sendCoachApplicationRejection,
  sendTutorApplicationRejection,
} from './thunks/sendApplicationRejection'
import {
  sendCoachApplicationAcceptance,
  sendTutorApplicationAcceptance,
} from './thunks/sendApplicationAcceptance'
import { assignTechnicalChallengeScores } from './thunks/assignTechnicalChallengeScores'

enum LanguageProficiency {
  A1A2 = 'A1/A2',
  B1B2 = 'B1/B2',
  C1C2 = 'C1/C2',
  NATIVE = 'Native',
}

enum StudyDegree {
  BACHELOR = 'Bachelor',
  MASTER = 'Master',
}

enum StudyProgram {
  COMPUTER_SCIENCE = 'Computer Science',
  INFORMATION_SYSTEMS = 'Information Systems',
  GAMES_ENGINEERING = 'Games Engineering',
  MANAGEMENT_AND_TECHNOLOGY = 'Management and Technology',
  OTHER = 'Other',
}

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

enum Device {
  MACBOOK = 'Mac',
  IPHONE = 'IPhone',
  IPAD = 'IPad',
  APPLE_WATCH = 'Watch',
  RASPBERRY_PI = 'Raspberry PI',
}

enum Course {
  ITSE = 'Introduction to Software Engineering (IN0006)',
  PISE = 'Patterns in Software Engineering (IN2081)',
  ITP = 'Introduction to Programming (CIT5230000)',
  IPRAKTIKUM = 'iPraktikum (IN0012, IN2106, IN2128)',
  JASS = 'Joint Advanced Student School',
  FK = 'Ferienakademie',
  THESIS = 'Thesis',
}

interface Student {
  id: string
  tumId?: string
  matriculationNumber?: string
  isExchangeStudent: boolean
  firstName?: string
  lastName?: string
  gender?: keyof typeof Gender
  nationality?: string
  email?: string
}

interface ApplicationAssessment {
  instructorComments: InstructorComment[]
  suggestedAsCoach: boolean
  suggestedAsTutor: boolean
  blockedByPM: boolean
  reasonForBlockedByPM: string
  assessmentScore: number
  technicalChallengeScore: number
  assessed: boolean
  accepted: boolean | null
  interviewInviteSent: boolean
  acceptanceSent: boolean
  rejectionSent: boolean
}

enum ApplicationType {
  DEVELOPER = 'Developer',
  COACH = 'Coach',
  TUTOR = 'Tutor',
}

interface Application {
  id: string
  // The following field is artificially filled out by the client
  type: ApplicationType
  student: Student
  studyDegree?: StudyDegree
  currentSemester?: string
  studyProgram?: StudyProgram
  englishLanguageProficiency?: LanguageProficiency
  germanLanguageProficiency?: LanguageProficiency
  motivation?: string
  experience?: string
  solvedProblem?: string
  reasonGoodTutor?: string
  devices: Device[]
  coursesTaken: Course[]
  assessment?: ApplicationAssessment
  projectTeam?: ProjectTeam
}

interface InstructorComment {
  id?: string
  author: string
  timestamp?: string
  text: string
}

interface StudentApplicationSliceState {
  status: string
  error: string | null
  developerApplications: Application[]
  coachApplications: Application[]
  tutorApplications: Application[]
}

const initialState: StudentApplicationSliceState = {
  status: 'idle',
  error: null,
  developerApplications: [],
  coachApplications: [],
  tutorApplications: [],
}

export const applicationsState = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeveloperApplications.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchDeveloperApplications.fulfilled, (state, { payload }) => {
      state.developerApplications = payload
      state.status = 'idle'
    })

    builder.addCase(fetchDeveloperApplications.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(fetchCoachApplications.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchCoachApplications.fulfilled, (state, { payload }) => {
      state.coachApplications = payload
      state.status = 'idle'
    })

    builder.addCase(fetchCoachApplications.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(fetchTutorApplications.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchTutorApplications.fulfilled, (state, { payload }) => {
      state.tutorApplications = payload
      state.status = 'idle'
    })

    builder.addCase(fetchTutorApplications.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(updateDeveloperApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(updateDeveloperApplication.fulfilled, (state, { payload }) => {
      state.developerApplications = state.developerApplications.map((studentApplication) =>
        studentApplication.id === payload.id ? payload : studentApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(updateDeveloperApplication.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(updateDeveloperApplicationAssessment.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(updateDeveloperApplicationAssessment.fulfilled, (state, { payload }) => {
      state.developerApplications = state.developerApplications.map((studentApplication) =>
        studentApplication.id === payload.id ? payload : studentApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(updateDeveloperApplicationAssessment.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(updateCoachApplicationAssessment.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(updateCoachApplicationAssessment.fulfilled, (state, { payload }) => {
      state.coachApplications = state.coachApplications.map((studentApplication) =>
        studentApplication.id === payload.id ? payload : studentApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(updateCoachApplicationAssessment.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(updateTutorApplicationAssessment.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(updateTutorApplicationAssessment.fulfilled, (state, { payload }) => {
      state.tutorApplications = state.tutorApplications.map((studentApplication) =>
        studentApplication.id === payload.id ? payload : studentApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(updateTutorApplicationAssessment.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendCoachInterviewInvitation.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendCoachInterviewInvitation.fulfilled, (state, { payload }) => {
      state.coachApplications = state.coachApplications.map((coachApplication) =>
        coachApplication.id === payload.id ? payload : coachApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(sendCoachInterviewInvitation.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendCoachApplicationAcceptance.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendCoachApplicationAcceptance.fulfilled, (state, { payload }) => {
      state.coachApplications = state.coachApplications.map((coachApplication) =>
        coachApplication.id === payload.id ? payload : coachApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(sendCoachApplicationAcceptance.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendCoachApplicationRejection.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendCoachApplicationRejection.fulfilled, (state, { payload }) => {
      state.coachApplications = state.coachApplications.map((coachApplication) =>
        coachApplication.id === payload.id ? payload : coachApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(sendCoachApplicationRejection.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendTutorInterviewInvitation.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendTutorInterviewInvitation.fulfilled, (state, { payload }) => {
      state.tutorApplications = state.tutorApplications.map((tutorApplication) =>
        tutorApplication.id === payload.id ? payload : tutorApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(sendTutorInterviewInvitation.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendTutorApplicationAcceptance.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendTutorApplicationAcceptance.fulfilled, (state, { payload }) => {
      state.tutorApplications = state.tutorApplications.map((tutorApplication) =>
        tutorApplication.id === payload.id ? payload : tutorApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(sendTutorApplicationAcceptance.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendTutorApplicationRejection.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendTutorApplicationRejection.fulfilled, (state, { payload }) => {
      state.tutorApplications = state.tutorApplications.map((tutorApplication) =>
        tutorApplication.id === payload.id ? payload : tutorApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(sendTutorApplicationRejection.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(assignTechnicalChallengeScores.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(assignTechnicalChallengeScores.fulfilled, (state, { payload }) => {
      state.developerApplications = state.developerApplications.map((sa) => {
        return (
          payload
            .filter(
              (updatedDeveloperApplication: Application) =>
                updatedDeveloperApplication.id === sa.id,
            )
            .at(0) ?? sa
        )
      })
      state.status = 'idle'
    })

    builder.addCase(assignTechnicalChallengeScores.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(createInstructorCommentForDeveloperApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(
      createInstructorCommentForDeveloperApplication.fulfilled,
      (state, { payload }) => {
        state.developerApplications.map((sa) => {
          return sa.id === payload.id ? payload : sa
        })
        state.status = 'idle'
      },
    )

    builder.addCase(
      createInstructorCommentForDeveloperApplication.rejected,
      (state, { payload }) => {
        if (payload) state.error = 'error'
        state.status = 'idle'
      },
    )

    builder.addCase(createInstructorCommentForCoachApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(createInstructorCommentForCoachApplication.fulfilled, (state, { payload }) => {
      state.coachApplications.map((sa) => {
        return sa.id === payload.id ? payload : sa
      })
      state.status = 'idle'
    })

    builder.addCase(createInstructorCommentForCoachApplication.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(createInstructorCommentForTutorApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(createInstructorCommentForTutorApplication.fulfilled, (state, { payload }) => {
      state.tutorApplications.map((sa) => {
        return sa.id === payload.id ? payload : sa
      })
      state.status = 'idle'
    })

    builder.addCase(createInstructorCommentForTutorApplication.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(assignDeveloperApplicationToProjectTeam.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(assignDeveloperApplicationToProjectTeam.fulfilled, (state, { payload }) => {
      state.developerApplications = state.developerApplications.map((studentApplication) =>
        studentApplication.id === payload.id ? payload : studentApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(assignDeveloperApplicationToProjectTeam.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(removeDeveloperApplicationFromProjectTeam.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(removeDeveloperApplicationFromProjectTeam.fulfilled, (state, { payload }) => {
      state.developerApplications = state.developerApplications.map((studentApplication) =>
        studentApplication.id === payload.id ? payload : studentApplication,
      )
      state.status = 'idle'
    })

    builder.addCase(removeDeveloperApplicationFromProjectTeam.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(deleteDeveloperApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(deleteDeveloperApplication.fulfilled, (state, { payload }) => {
      state.developerApplications = state.developerApplications.filter(
        (developerApplication) => developerApplication.id !== payload,
      )
      state.status = 'idle'
    })

    builder.addCase(deleteDeveloperApplication.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(deleteCoachApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(deleteCoachApplication.fulfilled, (state, { payload }) => {
      state.coachApplications = state.coachApplications.filter(
        (coachApplication) => coachApplication.id !== payload,
      )
      state.status = 'idle'
    })

    builder.addCase(deleteCoachApplication.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(deleteTutorApplication.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(deleteTutorApplication.fulfilled, (state, { payload }) => {
      state.tutorApplications = state.tutorApplications.filter(
        (tutorApplication) => tutorApplication.id !== payload,
      )
      state.status = 'idle'
    })

    builder.addCase(deleteTutorApplication.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })
  },
})

// export const {} = studentApplicationsState.actions
export default applicationsState.reducer
export {
  type Student,
  type Application,
  type InstructorComment,
  type ApplicationAssessment,
  ApplicationType,
  LanguageProficiency,
  StudyDegree,
  StudyProgram,
  Gender,
  Device,
  Course,
}
