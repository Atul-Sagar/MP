// Event Listeners

document.addEventListener('DOMContentLoaded', startup)


function startup(){
    addAccordions()
    handleAccordions()
    entryButtonsEventListeners()
    calculateSumEventListeners()
}

function addAccordions(){
    
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let wrapper = document.querySelector('.wrapper-accordion')
    for (let index = 0; index < months.length; index++) {
        let tab = document.createElement('button')  
        tab.setAttribute('class','accordion')
        tab.setAttribute('id','tab_'+months[index].toLowerCase())
        tab.innerText = months[index]

        let panel = document.createElement('div')
        panel.setAttribute('class', 'panel')
        panel.setAttribute('id','panel_'+months[index].toLowerCase())

        let p = document.createElement('p')
        p.setAttribute('id', 'p_'+months[index].toLowerCase())
        p.textContent = 'sample text'

        let row = generateElement('div')
        row.setAttribute('display', 'flex')
        row.setAttribute('id', 'r_'+months[index].toLowerCase()+"_"+p.children.length)
        row.setAttribute('class', 'MonthExpenseRows')
        // row.setAttribute('id')

        let label = generateElement('label')
        label.innerText = '1'

        let input = generateElement('input')
        let childCount = p.children.length
        input.setAttribute('id', months[index].toLowerCase()+"_input_"+(childCount+1))
        input.setAttribute('class', 'input_'+months[index].toLowerCase())


        let ButtonsDiv = generateElement('div')
        ButtonsDiv.setAttribute('class', 'ButtonsDiv')

        let addEntry = generateElement('button');
        addEntry.innerHTML = 'Add Entry'
        addEntry.setAttribute('id','entry'+months[index])
        addEntry.setAttribute('class', 'AddEntryButtons')

        let calculateSum = generateElement('button');
        calculateSum.innerHTML = 'Calculate Sum'
        calculateSum.setAttribute('id', 'Sum'+months[index])
        calculateSum.setAttribute('class', 'CalculateSumButtons')

        ButtonsDiv.appendChild(addEntry)
        ButtonsDiv.appendChild(calculateSum)

        row.appendChild(label)
        row.appendChild(input)


        p.appendChild(row)
        p.appendChild(ButtonsDiv)
        panel.appendChild(p)
        wrapper.appendChild(tab)
        wrapper.appendChild(panel)

    }

    
}

// generate entry row

function generateRow(month, childCount){
    let row = generateElement('div')
    row.setAttribute('display', 'flex')
    row.setAttribute('id', 'r_'+month.toLowerCase()+"_"+(childCount-1))
    row.setAttribute('class', 'MonthExpenseRows')
    // row.setAttribute('id')

    let label = generateElement('label')
    label.innerText = childCount

    let input = generateElement('input')
    input.setAttribute('id', month+"_input_"+(childCount))
    input.setAttribute('class', 'input_'+month.toLowerCase())
    // input.setAttribute('id', month+"_input_"+(childCount+1))

    row.appendChild(label)
    row.appendChild(input)

    return row
}

// Event handler for add entry buttons 

function entryButtonsEventListeners(){
    let addEntryButtons = document.querySelectorAll('.AddEntryButtons');


    Object.keys(addEntryButtons).forEach((index) => {
        addEntryButtons[index].addEventListener('click', (event) => {
            console.log('source : ', event.target.id);
            let parent = document.getElementById(event.target.id)

            let generatedRow = generateRow(parent.id.substring(5,),parent.parentElement.parentElement.childNodes.length-1)
            // let generatedRow = generateRow(parent.id.substring(5,),parent.parentElement.childNodes.length-1)
            // let generatedRow = generateRow(parent.id.substring(5,),parent.parentElement.childNodes[1].children.length)

            let p = document.getElementById(event.target.id).parentElement.parentElement

            // p.children.length-1

            // january_input_1
            // p.id.split('_')[1]

            // let lastElementID = p.id.split('_')[1] + "_input_" + p.children.length-1;
            // let lastElementID = `${p.id.split('_')[1]}_input_${p.children.length-1}`
            let lastElement = p.childNodes[p.childNodes.length-2]


            // insertAfter(lastElement, generatedRow)
            insertAfter(generatedRow, lastElement)

        })
    });


}


// Event handler for calculate sum buttons

function calculateSumEventListeners(){
    let allCalculateSumButtons = document.querySelectorAll('.CalculateSumButtons');
    Object.keys(allCalculateSumButtons).forEach((index) => {
        allCalculateSumButtons[index].addEventListener('click', (event) => {
            console.log("calculate sum buttons clicked");
            console.log('source : ', event.target.id);
            let parent = document.getElementById(event.target.id)
            let MonthInputs = parent.parentElement.parentElement
            console.log("parent :", parent.parentElement.parentElement);
            let month = MonthInputs.id.split('_')[1]
            let selectedMonthInputsClassName = 'input_'+month;
            let inputToSum = document.getElementsByClassName(selectedMonthInputsClassName)
            console.log("list of inputs : ", inputToSum);

            values = []

            Object.keys(inputToSum).forEach((input) => {
                values.push(inputToSum[input].value)
            });
            console.log(values)

            let sum = 0;
            values.forEach(x => {
                if(x !== "")
                    sum += parseInt(x);
            });
            console.log("Sum of all entries for this month of "+ month +": ", sum);
            alert("Sum of all entries for this month of "+ month +" is "+ sum);
            
        });
    });
}

// function insertAfter(referenceNode, newNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode);
// }

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// Accordion

function handleAccordions(){
    var accordions = document.getElementsByClassName('accordion')
    var index;
    for (index = 0; index < accordions.length; index++) {
        accordions[index].addEventListener('click', function(event){
            
            console.log(event);
            let clickedAccordion = event.srcElement.id;


            this.classList.toggle('active');
    
            let panel = this.nextElementSibling;
            if(panel.style.display === 'block')
                panel.style.display = 'none'
            else
                panel.style.display = 'block'
        });   
    }
}


// setIncome 

function setIncome(){
    let monthly = document.getElementById('ID_income').value;
    console.log(monthly);

    let yearly = monthly * 12;
    document.getElementById('ID_yearly').innerText = `Monthly : ${monthly}, Yearly : ${yearly}`
    
}

function generateElementAndAppend(type, value, parent){
    let child = document.createElement(type).value = value;
    parent.appendChild(child)
}

function generateElement(type){
    return document.createElement(type)
}

