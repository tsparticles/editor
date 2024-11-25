import type { Container, IEvents } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { ClickEventsOptionsEditor } from "./ClickEventsOptionsEditor";
import { DivsEventsOptionsEditor } from "./DivsEventsOptionsEditor";
import { EditorBase } from "../../../../EditorBase";
import { HoverEventsOptionsEditor } from "./HoverEventsOptionsEditor";

export class EventsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IEvents;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("events", "Events");
        this.options = this.group.data as () => IEvents;

        this.addClick();
        this.addDivs();
        this.addHover();
        this.addProperties();
    }

    private addClick(): void {
        const clickEditor = new ClickEventsOptionsEditor(this.particles);

        clickEditor.addToGroup(this.group);
    }

    private addDivs(): void {
        const divsEditor = new DivsEventsOptionsEditor(this.particles);

        divsEditor.addToGroup(this.group);
    }

    private addHover(): void {
        const hoverEditor = new HoverEventsOptionsEditor(this.particles);

        hoverEditor.addToGroup(this.group);
    }

    private addProperties(): void {
        this.group.addProperty("resize", "Resize", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }
}
