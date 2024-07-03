class NavBarLogic {
    constructor(eventBus) {
      this.eventBus = eventBus;
      this.autosaveInterval = null;
    }
  
    handleButtonClick(item) {
      switch (item) {
        //   case "Corporate Objectives":
        //     this.eventBus.emit("toggleCorporateObjectives");
        //     break;
        //   case "North Star Metrics":
        //     this.eventBus.emit("toggleNorthStarMetrics");
        //     break;
        //   case "Strategic Focus Areas":
        //     this.eventBus.emit("toggleStrategicFocus");
        //     break;
        case "Node":
          this.eventBus.emit("toggleNode");
          break;
        case "Link":
          this.eventBus.emit("toggleLink");
          break;
        // Additional cases...
      }
    }
  
    handleSave() {
      const projectName = document.getElementById("projectName").value;
      if (!projectName) {
        alert("Please enter a project name.");
        return;
      }
  
      const objectivesData = this.eventBus.emit("getObjectiveData").flat();
      const metricsData = this.eventBus.emit("getMetricsData").flat();
  
      const projectData = { objectivesData, metricsData };
  
      fetch(`/saveProjectData/${encodeURIComponent(projectName)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Save successful:", data);
          alert("Project saved successfully!");
        })
        .catch((error) => {
          console.error("Save failed:", error);
          alert("Failed to save project.");
        });
    }
  
    handleLoad() {
      const projectName = document.getElementById("projectName").value;
      if (!projectName) {
        alert("Please enter a project name to load.");
        return;
      }
  
      fetch(`/loadProjectData/${encodeURIComponent(projectName)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Project not found");
          }
          return response.json();
        })
        .then((data) => {
          this.eventBus.emit("loadObjectiveData", data.objectivesData);
          this.eventBus.emit("loadMetricsData", data.metricsData);
        })
        .catch((error) => {
          console.error("Load failed:", error);
          alert("Failed to load project.");
        });
    }
  
    handleAutosaveToggle(isChecked) {
      if (isChecked) {
        this.autosaveInterval = setInterval(() => this.handleSave(), 10000);
      } else {
        clearInterval(this.autosaveInterval);
      }
    }
  }
  
  export { NavBarLogic };