import "./SidePanel.css"

export type SidePanelProps = {
    isOpen: boolean
}

export default function SidePanel(props: SidePanelProps){
    return (
            <div className={props.isOpen ? "sidepanel-open" : "sidepanel"}>
                <label>Search</label>
                <input type="text" />
            </div>
    )
}