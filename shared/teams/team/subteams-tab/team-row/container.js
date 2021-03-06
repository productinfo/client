// @flow
import * as I from 'immutable'
import * as Types from '../../../../constants/types/teams'
import * as FsTypes from '../../../../constants/types/fs'
import * as Constants from '../../../../constants/teams'
import {TeamRow} from '../../../main/team-list'
import {connect} from '../../../../util/container'
import * as RouteTreeGen from '../../../../actions/route-tree-gen'
import * as FsGen from '../../../../actions/fs-gen'

type OwnProps = {
  teamname: string,
}

const mapStateToProps = (state, {teamname}: OwnProps) => ({
  _newTeamRequests: state.teams.getIn(['newTeamRequests'], I.List()),
  _teamNameToIsOpen: state.teams.getIn(['teamNameToIsOpen'], I.Map()),
  members: Constants.getTeamMemberCount(state, teamname),
  yourRole: Constants.getRole(state, teamname),
})

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
  _onManageChat: (teamname: Types.Teamname) =>
    dispatch(RouteTreeGen.createNavigateAppend({path: [{props: {teamname}, selected: 'manageChannels'}]})),
  _onOpenFolder: (teamname: Types.Teamname) =>
    dispatch(FsGen.createOpenPathInFilesTab({path: FsTypes.stringToPath(`/keybase/team/${teamname}`)})),
  _onViewTeam: (teamname: Types.Teamname) => {
    dispatch(RouteTreeGen.createNavigateAppend({path: [{props: {teamname}, selected: 'team'}]}))
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps: OwnProps) => {
  const youAreMember = stateProps.yourRole && stateProps.yourRole !== 'none'
  return {
    isNew: false,
    isOpen: stateProps._teamNameToIsOpen.toObject()[ownProps.teamname],
    membercount: stateProps.members,
    name: ownProps.teamname,
    newRequests: stateProps._newTeamRequests.toArray().filter(team => team === ownProps.teamname).length,
    onManageChat: youAreMember ? () => dispatchProps._onManageChat(ownProps.teamname) : null,
    onOpenFolder: youAreMember ? () => dispatchProps._onOpenFolder(ownProps.teamname) : null,
    onViewTeam: () => dispatchProps._onViewTeam(ownProps.teamname),
  }
}

export default connect<OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TeamRow)
