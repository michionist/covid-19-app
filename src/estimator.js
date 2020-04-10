const normalizeDays = require("./helpers");

const covid19ImpactEstimator = (data) => {


    if (!data) console.error("No data!");

    const {
        reportedCases,
        totalHospitalBeds
    } = data;


    const calculateInfectionRate = function (obj, duration = "30") {
        const days = normalizeDays(duration);
        return obj.currentlyInfected * (Math.pow(2, (days / 3)))
    }

    const requestCaseByTime = (obj) => {
        return obj.infectionsByRequestedTime * 0.15
    }

    const calculateHospitalBed = (obj) => {
        return Math.round(totalHospitalBeds * 0.35) - obj.severeCasesByRequestedTime;
    }


    const impact = {
        currentlyInfected: reportedCases * 10
    }
    impact.infectionsByRequestedTime = calculateInfectionRate(impact);
    impact.severeCasesByRequestedTime = requestCaseByTime(impact);
    impact.hospitalBedsByRequestedTime = calculateHospitalBed(impact);



    const severeImpact = {
        currentlyInfected: reportedCases * 50
    }
    severeImpact.infectionsByRequestedTime = calculateInfectionRate(severeImpact);
    severeImpact.severeCasesByRequestedTime = requestCaseByTime(severeImpact);
    severeImpact.hospitalBedsByRequestedTime = calculateHospitalBed(severeImpact);

    return {
        data,
        impact,
        severeImpact
    };
};

export default covid19ImpactEstimator;