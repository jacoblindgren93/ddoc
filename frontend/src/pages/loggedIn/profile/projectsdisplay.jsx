import { useContext, useEffect, useRef, useState } from "react";
import DeleteDialog from "src/common/components/popUp/deleteDialog";
import ProjectTable from "./projectTable";
import { Projects } from "./profile";
import useFetch from "src/common/hooks/useFetch";
import useHeader from "src/common/hooks/useHeader";
export default function ProjectsDisplay() {
    const [showDeleteDialog, setDeleteDialog] = useState(false);
    const { projects, setProjects } = useContext(Projects);
    const ref = useRef(null);
    const { loading, response, error, remove } = useFetch();
    let tableHeaders = [];
    tableHeaders.push("Project");
    tableHeaders.push("Created by");
    tableHeaders.push("Created");
    tableHeaders.push("Open Tickets");

    function onDeleteRow(id, name) {
        const project = { id: id, projectName: name };
        ref.current = project;
        setDeleteDialog(true);
    }

    function deleteProject() {
        // If api returns true on response
        const { header } = useHeader();
        remove(`Project/${ref.current.id}`, header);
        const newArray = projects.filter(
            (project) => project.id !== ref.current.id
        );
        setProjects(newArray);
        setDeleteDialog(false);
    }

    return (
        <>
            {showDeleteDialog && (
                <DeleteDialog
                    open={showDeleteDialog}
                    title={`Leave project -> ${ref.current.projectName}`}
                    onClose={() => setDeleteDialog(false)}
                    action={deleteProject}
                    actionText="Leave"
                >
                    In case you are an admin and the only admin in the project
                    please enter the project and assign a member to the admin
                    role otherwise a random person will be assigned admin.
                    <br /> <br />
                    If you are the only remaining member in the project then the
                    project will get deleted.
                </DeleteDialog>
            )}
            <ProjectTable headers={tableHeaders} onDeleteRow={onDeleteRow} />
        </>
    );
}
