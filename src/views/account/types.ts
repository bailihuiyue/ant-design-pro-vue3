import { Ref } from '@vue/composition-api'

export interface langType {
  [key: string]: string
}

export interface UserInfo {
  adAccount: String
  avatar: String
  bio: String
  chineseName: String
  email: String
  empPosition: String
  employeeId: String
  englishName: String
  id: Number
  interest: String
  levelOneDept: String
  levelThreeDept: String
  levelTwoDept: String
  myInterest: String
  mySkills: String
  nickname: String
  skills: String
}

export interface PersonDetailHook {
  (needAll?: Boolean): Promise<PersonDetailHookRes>
}

export interface PersonDetailHookRes {
  loading: Ref<Boolean>
  allSkills: Array<String>
  allInterest: Array<String>
  userInfo: Partial<UserInfo>
}

export interface UpdateUserLabel {
  interest: Array<String>
  myInterest: Array<String>
  mySkills: Array<String>
  skills: Array<String>
  id: Number
}

export interface AllLabelItem {
  cdate: String
  creator: String
  edate: String
  editor: String
  hobby: String
  id: String
  insertDate: String
  skill: String
}
