import './css/SelectGroup.css'

function SelectGroup() {
    function storeGroup(val) {
        localStorage.setItem("group", JSON.stringify(val))
        document.location.reload()
    }
    
    return (
        <div className="SelectGroup">
            <select id="klasser" name="klasser" onChange={e => storeGroup(e.target.value)}>
                <option value="" disabled selected>Klass</option>
                <option value="BIO1A">Biologi a</option>
                <option value="BIO1B">Biologi b</option>
                <option value="MAT1">Matematik</option>
                <option value="KEM1">Kemi</option>
                <option value="DJP1">Djurpsykologi</option>
            </select>
        </div>
    );
}

export default SelectGroup;