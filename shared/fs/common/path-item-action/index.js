// @flow
import * as I from 'immutable'
import * as React from 'react'
import * as Types from '../../../constants/types/fs'
import * as Styles from '../../../styles'
import * as Kb from '../../../common-adapters'
import ChooseView from './choose-view'

type Props = {|
  actionIconClassName?: string,
  actionIconFontSize?: number,
  actionIconWhite?: boolean,
  onHidden: () => void,
  path: Types.Path,
  routePath: I.List<string>,
|}

const PathItemAction = (props: Props & Kb.OverlayParentProps) => {
  const hideMenuOnce = (() => {
    let hideMenuCalled = false
    return () => {
      if (hideMenuCalled) {
        return
      }
      hideMenuCalled = true
      props.toggleShowingMenu()
      props.onHidden()
    }
  })()

  return (
    <Kb.Box>
      <Kb.ClickableBox onClick={props.toggleShowingMenu} ref={props.setAttachmentRef}>
        <Kb.Icon
          type="iconfont-ellipsis"
          color={props.actionIconWhite ? Styles.globalColors.white : Styles.globalColors.black_50}
          style={Kb.iconCastPlatformStyles(styles.actionIcon)}
          fontSize={props.actionIconFontSize}
          className={props.actionIconClassName}
        />
      </Kb.ClickableBox>
      {props.showingMenu && (
        <ChooseView
          path={props.path}
          routePath={props.routePath}
          floatingMenuProps={{
            attachTo: props.getAttachmentRef,
            containerStyle: styles.floatingContainer,
            hideOnce: hideMenuOnce,
            visible: props.showingMenu,
          }}
        />
      )}
    </Kb.Box>
  )
}

const styles = Styles.styleSheetCreate({
  actionIcon: {
    padding: Styles.globalMargins.tiny,
  },
  floatingContainer: Styles.platformStyles({
    common: {
      overflow: 'visible',
    },
    isElectron: {
      marginTop: 12,
      width: 220,
    },
    isMobile: {
      marginTop: undefined,
      width: '100%',
    },
  }),
})

export default Kb.OverlayParentHOC(PathItemAction)
