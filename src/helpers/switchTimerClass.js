export default function switchClassProp(value, func) {
  switch (value) {
    case "0":
      func("zero");
      break;
    case "1":
      func("one");
      break;
    case "2":
      func("two");
      break;
    case "3":
      func("three");
      break;
    case "4":
      func("four");
      break;
    case "5":
      func("five");
      break;
    case "6":
      func("six");
      break;
    case "7":
      func("seven");
      break;
    case "8":
      func("eight");
      break;
    case "9":
      func("nine");
      break;
    default:
      func("zero");
  }
}
