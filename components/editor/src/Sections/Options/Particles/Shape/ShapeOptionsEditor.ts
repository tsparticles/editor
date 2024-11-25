import type { Container, IShape } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class ShapeOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IShape;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("shape", "Shape");
        this.options = this.group.data as () => IShape;

        this.addProperties();
    }

    private addProperties(): void {
        const selectType = this.group.addProperty("type", "Type", EditorType.select).change(() => {
            void this.particles().refresh();
        });

        for (const key of this.particles().shapeDrawers.keys()) {
            selectType.addItem(key);
        }
    }
}
