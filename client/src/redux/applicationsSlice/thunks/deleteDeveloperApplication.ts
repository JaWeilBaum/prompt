import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { serverBaseUrl } from '../../../service/configService'

export const deleteDeveloperApplication = createAsyncThunk(
  'applications/deleteDeveloperApplication',

  async (developerApplicationId: string, { rejectWithValue }) => {
    try {
      return (
        await axios.delete(
          `${serverBaseUrl}/api/applications/developer/${developerApplicationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token') ?? ''}`,
            },
          },
        )
      ).data
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)
