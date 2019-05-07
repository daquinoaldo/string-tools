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
  let originalSchema = ""
  let length = 0
  if (useSchema) {
    originalSchema = document.getElementById("schema").value
    schema = originalSchema
    while (schema.indexOf("[") >= 0)
      // separate the word schema from the additional char
      schema = schema.replace(/ *\[[^\]]*\]*/g, "")
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
      switch (schema[i]) {
        case schema[i].toLowerCase():
          if (word[i] != schema[i]) return false
          break;
        case "V":
          if (vowels.indexOf(word[i]) < 0) return false
          break;
        case "C":
          if (consonants.indexOf(word[i]) < 0) return false
          break;
        default:
          break;
      }
    return true
  })
  
  // Extract the words randomly
  let list = ""
  for (let i = 0; i < iterations; i++) {
    let tempOriginalSchema = originalSchema
    if (filtered.length <= 0) break // no other word remains
    // pick a word
    const j = Math.floor(Math.random() * filtered.length)
    w = filtered[j]
    // remove the picked word
    filtered = filtered.filter(word => word !== w)
    // put additional char in the word
    let added = 0
    while (tempOriginalSchema && tempOriginalSchema.indexOf("[") >= 0) {
      res = / *\[[^\]]*\]*/g.exec(tempOriginalSchema)
      const addition = res[0].replace("[", "").replace("]", "")
      const index = added + res.index
      w = w.substr(0, index) + addition + w.substr(index)
      added += addition.length
      tempOriginalSchema = tempOriginalSchema.replace(res[0], "")
    }
    // add it to the list
    list += w + "\n"
  }

  document.getElementById("result").rows = iterations + 1
  document.getElementById("result").value = list
}