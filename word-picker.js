// Toggle mode
function toggle(checkbox) {
  if (checkbox.checked) {
    document.getElementById("schemaMode").style.display = "block"
    document.getElementById("standardMode").style.display = "none"
  } else {
    document.getElementById("standardMode").style.display = "block"
    document.getElementById("schemaMode").style.display = "none"
  }
}

// Load dictionary
let dictionary = ""
async function loadDict() {
  dictionary = await fetch("dictionary_en.txt").then(res => res.text()).then(text => text.split('\n'))
}
loadDict()
const vowels = "aeiou"
const consonants = "bcdfghjklmnpqrstvwxyz"

// Generate
function generate() {
  // Get the schema
  const useSchema = document.getElementById("useSchema").checked
  let schema = ""
  let length = 0
  if (useSchema) {
    schema = document.getElementById("schema").value
    length = schema.length
  } else {  // generate the schema
    length = parseInt(document.getElementById("length").value)
    schema = document.getElementById("start-with").value
  }
  const iterations = parseInt(document.getElementById("iterations").value)
  const exclude = document.getElementById("exclude").value.toLowerCase()

  let filtered = dictionary
  // filter by length
  if (length) filtered = filtered.filter(word => word.length === length + 1)
  // filter words with letter to be excluded
  if (exclude) filtered = filtered.filter(word => {
    for (let i = 0; i < exclude.length; i++)
      if (word.indexOf(exclude[i]) >= 0) return false
    return true
  })
  // match the schema
  if (schema) filtered = filtered.filter(word => {
    for (let i = 0; i < schema.length; i++)
      if (schema[i] == "V" && vowels.indexOf(word[i]) < 0) return false
      else if (schema[i] == "C" && consonants.indexOf(word[i]) < 0) return false
    return true
  })
  
  // Extract the words randomly
  let list = ""
  for (let i = 0; i < iterations; i++) {
    if (filtered.length <= 0) break
    const j = Math.floor(Math.random() * filtered.length)
    w = filtered[j]
    filtered = filtered.filter(word => word !== w)
    list += w + "\n"
  }

  document.getElementById("result").rows = iterations + 1
  document.getElementById("result").value = list
}