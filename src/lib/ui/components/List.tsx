import type { ReactNode } from 'react'
import { type ListItemProps, List } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface AnkhUiListItemProps extends ListItemProps {
  readonly icon?: {
    readonly left?: string
    readonly right?: string
  }
}
export interface AnkhUiListProps {
  readonly id: string
  readonly title?: ReactNode | string
  readonly items?: AnkhUiListItemProps[]
}

export default function AnkhUiList({ id, title, items = [] }: AnkhUiListProps) {
  const listTitle = typeof title === 'string' ? title : <title />

  function renderListItem(item: AnkhUiListItemProps) {
    const itemProps = { ...item }
    const { left: l, right: r } = item.icon || {}

    if (l) itemProps.left = () => <List.Icon icon={l as IconSource} />
    if (r) itemProps.right = () => <List.Icon icon={r as IconSource} />

    delete itemProps.icon

    return <List.Item {...itemProps} />
  }

  return (
    <List.Section>
      {title && <List.Subheader>{listTitle}</List.Subheader>}
      {items.map((item, i) =>
        renderListItem({ ...item, key: `list-${item.id}-${i}` || id }),
      )}
    </List.Section>
  )
}
