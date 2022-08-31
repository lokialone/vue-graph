import {arrayValue} from './data.type'
class TreeNode {
    id: string;
    label?: number | null;
    children: (TreeNode| null)[];
    constructor(id: string, label: number| null) {
        this.id = id;
        this.label = label;
        this.children = [];
    }
}
class TreeGenerate {
    data: arrayValue[];
    offset: number;
    constructor(data: arrayValue[]) {
        this.data = data;
        this.offset = 0;
    }
    // 绘制没有优化的过的二叉树
    generate(index = 0) {
        let current = this.data[index] || null;
        if (index >= this.data.length || !current) {
            return new TreeNode(index.toString(), null);
        }
        const node = new TreeNode(index.toString(), current);
        let leftNode = this.generate(2 * index + 1);
        let rightNode = this.generate(2 * index + 2);
        if (leftNode) { node.children.push(leftNode);}   
        if (rightNode) { node.children.push(rightNode);}
         
        return node;
    }
    // 根据LeetCode的优化规则去绘制二叉树
    generateLG() {
        let data = this.data;
        return TreeGenerate.generateLG(data);
    }
    static generateLG(data: arrayValue[]) {
        let result = new TreeNode('0',data[0]);
        let map =  new Map();
        let length = data.length;
        let offset = 0;
        for(let i = 0; i < length; i++) {
            let tmpData = {} as TreeNode;
            if (map.has(i)) {
                tmpData = map.get(i);
                map.delete(i);
            } else {
                tmpData = new TreeNode(i.toString(), data[i]);
            }
            // 通过offset来跳过空子节点
            if (tmpData.label) {
                const leftIndex = 2 * i + 1 - offset;
                const leftChild = new TreeNode(leftIndex.toString(), data[leftIndex]);
                const rightChild = new TreeNode(String(leftIndex+1), data[leftIndex + 1]);
                map.set(leftIndex, leftChild);
                map.set(leftIndex+1, rightChild);
                // 子节点都为空就不插入
                if (leftChild.label || rightChild.label) {
                    tmpData.children = [leftChild, rightChild]
                }
            } else {
                offset +=2;
            }
            if (i == 0) {
                result = tmpData;
            }
        }
        return result;
    }
}
export { TreeGenerate, TreeNode};