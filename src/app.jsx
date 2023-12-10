import React, { useState} from 'react';
import Form from './components/Form';
import Result from './components/Resultado';
import Header from './components/Header';
import Resume from './components/Resume'; 
import Historial from './components/Historial';
import getFinalBudget from './Helper';
import datos from './datos.json';



const App = () => {
  const [budgetObj, setBudgetObj] = useState(null);


  return (
    <div>
      

      {/* Encabezado */}
      <Header title="COTIZADOR DE SEGUROS" />
     
      
      {/* Formulario */}
      <Form setBudgetObj={setBudgetObj} />

      {/* Resultado */}
      {budgetObj && <Result budgetAmount={budgetObj.budgetAmount} />}

      {/* Resume */}
      {budgetObj && <Resume formData={budgetObj.formData} quote={budgetObj.budgetAmount} />}

      <Header title="HISTORIAL DE BUSQUEDA" />

       {/* Historial */}
       <Historial title="historial"/>

      
    </div>
  );
};

export default App;
