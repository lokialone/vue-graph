
import G6 from '@antv/g6';
import {TreeGenerate} from './generateData'
import {arrayValue} from './data.type'
export default function createG6Graph(containerString: string, data?: arrayValue[]) {
    const container = document.getElementById(containerString);
    const width = container?.scrollWidth;
    const height = container?.scrollHeight || 500;
    const graph = new G6.TreeGraph({
        container: containerString,
        width,
        height,
        linkCenter: true,
        modes: {
        default: [
            {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
                const data = item?.getModel();
                data && (data.collapsed = collapsed);
                return true;
            },
            },
            'drag-canvas',
            'zoom-canvas',
        ],
        },
        defaultNode: {
        size: 26,
        anchorPoints: [
            [0, 0.5],
            [1, 0.5],
        ],
        },
        defaultEdge: {
            type: 'line',
        },
        layout: {
            type: 'compactBox',
            direction: 'TB',
            getId: function getId(d: {id: string}) {
                return d.id;
            },
            getHeight: function getHeight() {
                return 16;
            },
            getWidth: function getWidth() {
                return 16;
            },
            getVGap: function getVGap() {
                return 20;
            },
            getHGap: function getHGap() {
                return 20;
            },
        },
    });
    graph.node(function (node) {
        let position = 'center';
        if (node.label) {
            return {
                label: node.label,
                labelCfg: {
                    position,
                    style: {
                        // rotate,
                        textAlign: 'center',
                    },
                },
            };
        } else {
            return {
                    label: 'null',
                    labelCfg: {
                    position,
                    style: {
                        // rotate,
                        textAlign: 'center',
                    },
                },
            }
        }
    });
    data && render(data);
    if (typeof window !== 'undefined')
        window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };

    function render(data: arrayValue[]) {
        graph.data(TreeGenerate.generateLG(data));
        graph.render();
        graph.fitView();
    }
    return {
        render,
        graph,
    }
}




