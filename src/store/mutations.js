
import * as types from './mutations-types'

const mutations = {
    [types.AudioIndex](state, audioIndex) {
        state.audioIndex = audioIndex
    },
    [types.AudioList](state, audioList) {
        state.audioList = audioList
    },
    [types.Change_Collection](state, collection) {
        state.isCollection = collection
    },
    [types.PlayState](state, playState) {
        state.playState = playState
    }
}

export default mutations