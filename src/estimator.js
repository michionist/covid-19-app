const normalizeDays = require('./helpers');

const covid19ImpactEstimator = (data) => {

    const {
        reportedCases,
        totalHospitalBeds,
        timeToElapse,
        region
    } = data;

    const calculateInfectionRate = (obj, duration = 30) =>
        obj.currentlyInfected * Math.pow(2, normalizeDays(duration) / 3);

    const requestCaseByTime = (obj) =>
        obj.infectionsByRequestedTime * 0.15;


    const calculateHospitalBed = (obj) =>
        Math.round(totalHospitalBeds * 0.35) - obj.severeCasesByRequestedTime


    const casesForICU = (obj) =>
        obj.infectionsByRequestedTime * 0.05;


    const casesForVentilators = (obj) =>
        obj.infectionsByRequestedTime * 0.02;


    const calcDollarsInFlight = (obj) =>
        (
            obj.infectionsByRequestedTime *
            region.avgDailyIncomePopulation *
            region.avgDailyIncomeInUSD *
            timeToElapse
        );

    // Estimation for the Normal impact
    const impact = {
        currentlyInfected: reportedCases * 10
    };
    impact.infectionsByRequestedTime = calculateInfectionRate(impact);
    impact.severeCasesByRequestedTime = requestCaseByTime(impact);
    impact.hospitalBedsByRequestedTime = calculateHospitalBed(impact);
    impact.casesForICUByRequestedTime = casesForICU(impact);
    impact.casesForVentilatorsByRequestedTime = casesForVentilators(impact);
    impact.dollarsInFlight = calcDollarsInFlight(impact);

    // Estimation for the Severe impact
    const severeImpact = {
        currentlyInfected: reportedCases * 50
    };
    severeImpact.infectionsByRequestedTime = calculateInfectionRate(severeImpact);
    severeImpact.severeCasesByRequestedTime = requestCaseByTime(severeImpact);
    severeImpact.hospitalBedsByRequestedTime = calculateHospitalBed(severeImpact);
    severeImpact.casesForICUByRequestedTime = casesForICU(severeImpact);
    severeImpact.casesForVentilatorsByRequestedTime = casesForVentilators(
        severeImpact
    );
    severeImpact.dollarsInFlight = calcDollarsInFlight(severeImpact);

    return {
        data,
        impact,
        severeImpact
    };
};
export default covid19ImpactEstimator;
// module.exports = covid19ImpactEstimator;