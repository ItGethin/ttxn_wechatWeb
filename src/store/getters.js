

export const audioIndex = state => state.audioIndex

export const audioList = state => state.audioList

export const audioId = (state) => state.audioList.length ? state.audioList[state.audioIndex].id : ""

export const isCollection = state => state.isCollection

export const playState = state => state.playState