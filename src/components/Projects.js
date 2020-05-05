import React, { useState } from "react"
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { IndividualProject } from "./IndividualProject";

export const Projects = ({ activeValue = true }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map(project => (
      <li
        key={project.projectId}
        data-dod-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
        onClick={() => {
          setActive(project.projecId);
          setSelectedProject(project.projecId);
        }}
      >
        <IndividualProject project={project} />
      </li>
    ))
  );
}