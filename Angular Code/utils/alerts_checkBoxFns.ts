const getCheckBoxIdString = (chkBoxIndex: string, type: string, index: number) => {
    if (type === 'vertical') {
        return ('chkBox_' + chkBoxIndex + '_' + index);
    }
    if (type === 'horizontal') {
        return ('chkBox_' + index + '_' + chkBoxIndex);
    }
};

const checkBoxesStatus = (cIndex: string, arr: string[], type: string) => {
    return arr.every((element, index) => {
        const checkboxIdString = getCheckBoxIdString(cIndex, type, index);
        const chkBox = document.getElementById(checkboxIdString);
        return getCheckBoxStatus(chkBox);
    });
};

const getCheckBoxesStatus = (arr: string[], chkBoxIndex: string, type: string, length?: number) => {

    if (!length) {
        return checkBoxesStatus(chkBoxIndex, arr, type);
    }

    let boolArr: boolean[] = [];
    for (let i = 0; i < length; i++) {
        boolArr.push(checkBoxesStatus(i.toString(), arr, type));
    }
    return boolArr.some(elem => elem);

};

const getIndexOfCheckBox = (idOfCheckBox: string, startingString: string): string => idOfCheckBox.replace(startingString, '');

const getCheckBoxStatus = (checkboxCollection: HTMLCollectionOf<Element> | HTMLElement): boolean => {
    if (checkboxCollection instanceof HTMLElement) {
        return (<HTMLInputElement>checkboxCollection).checked;
    } else {
        return Array.from(<HTMLCollectionOf<HTMLInputElement>>checkboxCollection)
            .every((chckGrp) => chckGrp.checked);
    }
};

const updateCheckBoxes = (checkboxCollection: HTMLCollectionOf<Element> | HTMLElement, status: boolean) => {
    if (checkboxCollection instanceof HTMLElement) {
        (<HTMLInputElement>checkboxCollection).checked = status;

    } else {
        for (let chkGrp of Array.from(checkboxCollection)) {

            /* Also Type Assertion is used here to assert into HTMLInputElement.
        
            Notes on : Type Assertion
            casting generally implies some sort of runtime support. 
            However, type assertions are purely a compile time construct 
            and a way for you to provide hints to the compiler on how you want your code to be analyzed
            
            More Notes: 
            Basically, the assertion from type S to T succeeds if either S is a subtype of T or T is a subtype of S. */
            (<HTMLInputElement>chkGrp).checked = status;
        }
    }

};

const updateCheckBoxesStatus = (arr: string[], chkBoxIndex: string, status: boolean, type: string) => {
    let checkboxIdString = '';

    arr.forEach((element, index) => {
        checkboxIdString = getCheckBoxIdString(chkBoxIndex, type, index);
        const chkBox = document.getElementById(checkboxIdString);
        updateCheckBoxes(chkBox, status);
    });
};





const getCheckBoxesIDArray = (checkboxCollection: HTMLCollectionOf<Element>) => {
    return Array.from(<HTMLCollectionOf<HTMLInputElement>>checkboxCollection)
        .filter((chckGrp) => chckGrp.checked).map((chckGrp) => chckGrp.id);
};

/* Returns  checked | unchecked based on id of the checkbox */
const isChecKBoxChecked = (idOfCheckBox: string) => {
    // Type Assertion from HTMLElement to HTMLInputElement
    const checkBoxElement = document.getElementById(idOfCheckBox) as HTMLInputElement;
    return (checkBoxElement.checked) ? 'checked' : 'unchecked';
};

const atleastOneCheckBoxChecked = (checkboxCollection: HTMLCollectionOf<Element>) => {
    return Array.from(<HTMLCollectionOf<HTMLInputElement>>checkboxCollection)
    .some((chckGrp) => chckGrp.checked);
};


export {
    isChecKBoxChecked, getCheckBoxesIDArray, getCheckBoxStatus, updateCheckBoxes, updateCheckBoxesStatus,
    getIndexOfCheckBox, getCheckBoxesStatus, getCheckBoxIdString, atleastOneCheckBoxChecked, checkBoxesStatus
};