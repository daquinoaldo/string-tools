function getLetter() {
	var alphabet = "abcdefghijklmnopqrstuvwxyz"
	return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}
function getVowel() {
	var alphabet = "aeiou"
	return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}
function getConsonant() {
	var alphabet = "bcdfghjklmnpqrstvwxyz"
	return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}
function main() {
	const schema = document.getElementById("schema").value
  const iterations = parseInt(document.getElementById("iterations").value)
	const exclude = document.getElementById("exclude").value
	let text = ""
  for (let j = 0; j < iterations; j++) {
    for (let i = 0; i < schema.length; i++) {
      var s = schema.charAt(i)
      // if lowercase is a custom letter
      if (s === s.toLowerCase()) text += s
      else {
        var attempts = 1000
        var stop = false
        var letter
        do {
          switch (s) {
            case "V":
              letter = getVowel()
              break
            case "C":
              letter = getConsonant()
              break
            case "L":
              letter = getLetter()
              break
            default:
              text = "Error: check the schema!"
              i = schema.length
              letter = ""
              stop = true
          }
          if (!attempts) {
            text="Error: check the exclusions!"
            i = schema.length
            letter = ""
            stop = true
          }
          attempts--
        } while (exclude.indexOf(letter) > -1 && !stop)
        text += letter
      }
    }
    text += "\n"
  }
  const resultBox = document.getElementById("result")
  resultBox.cols = schema.length + 2
  resultBox.rows = iterations + 1
  resultBox.value = text
}