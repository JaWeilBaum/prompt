import { createSlice } from '@reduxjs/toolkit'
import { deleteStudentProjectTeamPreferences } from './thunks/deleteStudentProjectTeamPreferences'
import { fetchStudentPostKickoffSubmissions } from './thunks/fetchStudentPostKickoffSubmissions'
import { sendKickoffSubmissionInvitations } from './thunks/sendKickoffSubmissionInvitations'
import { Skill } from '../../interface/skill'
import { Student } from '../../interface/application'

enum SkillProficiency {
  NOVICE = 'Novice',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

const getBadgeColor = (skillProfieciency: keyof typeof SkillProficiency): string => {
  switch (skillProfieciency) {
    case 'NOVICE':
      return 'yellow'
    case 'INTERMEDIATE':
      return 'orange'
    case 'ADVANCED':
      return 'teal'
    case 'EXPERT':
      return 'green'
  }
  return 'gray'
}

enum SkillAssessmentSource {
  STUDENT = 'STUDENT',
  TUTOR = 'TUTOR',
  MGMT = 'MGMT',
}

interface StudentSkill {
  id?: string
  skill: Skill
  skillAssessmentSource: SkillAssessmentSource
  skillProficiency: SkillProficiency
}

interface StudentProjectTeamPreference {
  projectTeamId: string
  priorityScore: number
}

interface StudentPostKickoffSubmission {
  id?: string
  student?: Student
  appleId: string
  macBookDeviceId?: string
  iPhoneDeviceId?: string
  iPadDeviceId?: string
  appleWatchDeviceId?: string
  gitlabUsername?: string
  studentProjectTeamPreferences: StudentProjectTeamPreference[]
  reasonForFirstChoice: string
  reasonForLastChoice: string
  selfReportedExperienceLevel: SkillProficiency
  studentSkills: StudentSkill[]
}

interface StudentPostKickoffSubmissionsSliceState {
  status: string
  error: string | null
  studentPostKickoffSubmissions: StudentPostKickoffSubmission[]
}

const initialState: StudentPostKickoffSubmissionsSliceState = {
  status: 'idle',
  error: null,
  studentPostKickoffSubmissions: [],
}

export const studentPostKickoffSubmissionsSlice = createSlice({
  name: 'studentPostKickoffSubmissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentPostKickoffSubmissions.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchStudentPostKickoffSubmissions.fulfilled, (state, { payload }) => {
      state.studentPostKickoffSubmissions = payload
      state.status = 'idle'
    })

    builder.addCase(fetchStudentPostKickoffSubmissions.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(deleteStudentProjectTeamPreferences.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(deleteStudentProjectTeamPreferences.fulfilled, (state, { payload }) => {
      state.studentPostKickoffSubmissions = payload
      state.status = 'idle'
    })

    builder.addCase(deleteStudentProjectTeamPreferences.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })

    builder.addCase(sendKickoffSubmissionInvitations.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(sendKickoffSubmissionInvitations.fulfilled, (state) => {
      state.status = 'idle'
    })

    builder.addCase(sendKickoffSubmissionInvitations.rejected, (state, { payload }) => {
      if (payload) state.error = 'error'
      state.status = 'idle'
    })
  },
})

export default studentPostKickoffSubmissionsSlice.reducer
export {
  type StudentProjectTeamPreference,
  type StudentPostKickoffSubmission,
  type StudentSkill,
  SkillProficiency,
  SkillAssessmentSource,
  getBadgeColor,
}
