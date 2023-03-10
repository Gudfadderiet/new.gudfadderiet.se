import './css/Schema.css'

function Schema() {
    {
    /*
    TODO
    ====
    - Göra en snyggare kanlender som hämtar event från Django som i sin tur har hämtat från Google Calender och gjort om till JSON. 
    */
    }

    return (
      <div className="Schema">
        <select id="klasser" name="klasser">
            <option value="bio-a">Biologi a</option>
            <option value="bio-b">Biologi b</option>
            <option value="mat">Matematik</option>
            <option value="kem">Kemi</option>
            <option value="djp">Djurpsykologi</option>
        </select>
      </div>
    );
}
  
export default Schema;