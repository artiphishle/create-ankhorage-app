import { List } from 'react-native-paper';
export default function AnkhUiList({ id, title, items = [] }) {
    const listTitle = typeof title === 'string' ? title : <title />;
    function renderListItem(item) {
        const itemProps = { ...item };
        const { left: l, right: r } = item.icon || {};
        if (l)
            itemProps.left = () => <List.Icon icon={l}/>;
        if (r)
            itemProps.right = () => <List.Icon icon={r}/>;
        delete itemProps.icon;
        return <List.Item {...itemProps}/>;
    }
    return (<List.Section>
      {title && <List.Subheader>{listTitle}</List.Subheader>}
      {items.map((item, i) => renderListItem({ ...item, key: `list-${item.id}-${i}` || id }))}
    </List.Section>);
}
