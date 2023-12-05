import { ExpandMore, ChevronLeft } from "@mui/icons-material";
import { iMenuTreeItem } from "../interfaces";
import { TreeItem, TreeView, treeItemClasses} from "@mui/x-tree-view";
import { Box, TextField, Typography, alpha, styled } from "@mui/material";
import { useMemo } from "preact/hooks";
interface iMenuTree {
    data: iMenuTreeItem,
    debouncedData: string,
}
// creates a styled tree item component
const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
        opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `3px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    },
    }));

// iterates over tree and gets all IDs
const getAllNodeIds = (item: iMenuTreeItem | null): string[] => {
    if (!item)
        return [];
    const nodeIds: string[] = [item.to];
    if (Array.isArray(item.items)) {
        item.items.forEach((subItem) => {
        const subNodeIds = getAllNodeIds(subItem);
        nodeIds.push(...subNodeIds);
        });
    }
    return nodeIds;
    };
    // filters a tree based on the value provided
const filterTree = (node: iMenuTreeItem, searchTerm: string): iMenuTreeItem | null => {
    const hasChildren = node.items && node.items.length > 0;
    
    if (node.title.includes(searchTerm)) {
        // If the current node includes the string, return it and all its children
        return node;
    }
    
    // If the current node does not include the string, iterate to the next node
    const filteredItems = hasChildren
        ? (node.items || []).map((item) => filterTree(item, searchTerm)).filter((item) => item !== null) as iMenuTreeItem[]
        : [];
    
    return filteredItems.length > 0
        ? {
            ...node,
            items: filteredItems,
        }
        : null;
};
    
const MenuTree: React.FC<iMenuTree> = ({data, debouncedData}) => {    
    
    // renders menu tree item
    const MenuTreeItem: React.FC<{ item: iMenuTreeItem }> = ({ item }) => {
        const hasChildren = item.items && item.items.length > 0;

        const label = <Box onClick={() => console.log(item.to)}><Typography pl={4} fontWeight={hasChildren ? "bold" : "italic"} variant={hasChildren ? "h6" : "body1"}>{item.title}</Typography></Box>;
        return (
            <StyledTreeItem key={item.to} nodeId={item.to} label={label}>
                {hasChildren && item.items!.map((subItem) => <MenuTreeItem key={subItem.to} item={subItem} />)}
              </StyledTreeItem>
        )
    }

    const filteredTree = useMemo(() => filterTree(data, debouncedData), [data, debouncedData]);
    const nodeIds = useMemo(() => getAllNodeIds(filteredTree), [filteredTree]);
    return (
        filteredTree && 
            <TreeView 
            defaultExpanded={nodeIds}
            defaultCollapseIcon={<ExpandMore style={{fontSize: "200%"}} />} 
            defaultExpandIcon={<ChevronLeft style={{fontSize: "200%"}}/>}
            onNodeToggle={undefined}
            onNodeSelect={undefined}>
                <MenuTreeItem item={filteredTree} />
            </TreeView>
    );
};

export default MenuTree;