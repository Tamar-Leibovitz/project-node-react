import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';

const HomePage = () => {
    return (
        <>
            <h1>HomePage:)</h1>
            <Accordion activeIndex={0} >
                <AccordionTab header="address" style={{width:200}}>
                    <InputText placeholder="city"style={{width:150}}/>
                    <InputText placeholder="street"style={{width:150}}/>
                    <InputText placeholder="building number"style={{width:150}}/>
                </AccordionTab>    
            </Accordion>
        </>
    )
}

export default HomePage