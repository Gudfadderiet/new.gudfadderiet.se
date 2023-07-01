import './css/Dokument.css'

function Dokument() {
    /* 
    TODO
    ====
    - Nolleenkät
    - Se Aktuella Nolleuppdrag
    - Nollehandbok mer lättnavigerad
    */
    return (
      <div className="Dokument">
        <h1>Nollehandboken</h1>
        <object data="/NOLLEHANDBOK.pdf" type="application/pdf" width="100%" height="1080px">
          <p>Unable to display PDF file. <a href="/NOLLEHANDBOK.pdf">Download</a> instead.</p>
        </object>
      </div>
    );
}
  
export default Dokument;