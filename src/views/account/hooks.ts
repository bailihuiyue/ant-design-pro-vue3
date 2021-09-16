import * as api from './service'
import { ref } from 'vue'
import { divisionStringToArray } from '@/utils/util'
import { PersonDetailHook, UserInfo, AllLabelItem } from './types'
export const getPersonDetail: PersonDetailHook = async needAll => {
  let userInfo: Partial<UserInfo> = {}
  const loading = ref<Boolean>(true)
  const res: Partial<UserInfo> = await api.personDetail()
  userInfo = res
  userInfo.skills = divisionStringToArray(res.skills)
  userInfo.mySkills = divisionStringToArray(res.mySkills)
  userInfo.interest = divisionStringToArray(res.interest)
  userInfo.myInterest = divisionStringToArray(res.myInterest)

  let allSkills: Array<string> = []
  let allInterest: Array<string> = []
  if (!res.skills?.length || needAll) {
    const allLabel: AllLabelItem[] = await api.findAllLabel()
    allSkills = divisionStringToArray(allLabel[0].skill)
    allInterest = divisionStringToArray(allLabel[0].hobby)
  }

  loading.value = false
  return {
    loading,
    allSkills,
    allInterest,
    userInfo
  }
}
