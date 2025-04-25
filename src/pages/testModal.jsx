import React, { useState } from "react";
import MatchedModal from "../components/matchedModal";

const TestModalPage = () => {
    return (
        <div>
            <MatchedModal 
                person={{ image: null, name: "Meep" }} 
                company={{ companyName: "Netflix", location: "Los Gatos, CA", logo: null, industry: "Entertainment" }} 
                position="Graphic Designer"
                skills={[
                    { skillId: "a1", skill: "Figma" }, 
                    { skillId: "a2", skill: "Adobe Illustrator" },
                    { skillId: "a3", skill: "Adobe Photoshop" },
                    { skillId: "a4", skill: "Procreate" }
                ]}
            />
        </div>
    )
}

export default TestModalPage;