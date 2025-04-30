import React from "react";

function CategorySearch() {
    return (
        <div className="px-5 my-5 d-flex align-items-center flex-column gap-2">
            <h2 className="fw-bold ps-3 display-6 mb-0">Search &nbsp;
                <span style={{ color: "#20b2aa" }}>Doctors</span>
            </h2>
            <p className="fs-4 ps-3 text-muted mb-0">Search, select, and schedule your doctor’s appointment in  just a few clicks.</p>

            <div className="d-flex w-100 align-items-center justify-content-center gap-2">
                <input type="text" placeholder="Start your search..." className="rounded-2 border border-none" style={{width:"20%"}}/>
                <button type="submit" className="btn text-white" style={{ backgroundColor: "#20b2aa" }}>Search</button>
            </div>

        </div>
    )
}

export default CategorySearch;