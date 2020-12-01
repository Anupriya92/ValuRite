const isDateInRange = (givenDate: Date, startDate: Date, endDate: Date ) => 
    startDate <= givenDate && givenDate <= endDate
;
export {isDateInRange};