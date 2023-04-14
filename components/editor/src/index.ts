import type { Container } from "tsparticles-engine";
import { ParticlesEditor } from "./ParticlesEditor";

/**
 *
 * @param container
 */
export function showEditor(container: Container): ParticlesEditor {
    return new ParticlesEditor(container);
}
