// Endpoint for form submission
 const formEndpoint =
   "https://pms-integrate.sunwayproperty.com/api/web-wellesley/triggers/new/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fnew%2Frun&sv=1.0&sig=EhD-90gZi81_2Fa8UTV4CXnaoAy-759teYWa840d6c8";

// Default payload values hardcoded
const payloadDefaults = {
  phase_integration_id: "2480",
  source_integration_id: "7001",
  campaign_integration_id: "",
  utm_source: "utm_source_value_from_url",
  utm_medium: "utm_medium_value_from_url",
  utm_campaign: "utm_campaign_value_from_url",
  utm_term: "utm_term_value_from_url",
  utm_content: "utm_content_value_from_url",
  location: "",
  preference: "",
  notes: "",
};

// Function to extract UTM parameters from URL query string
function extractUTMParametersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_term: urlParams.get('utm_term') || '',
    utm_content: urlParams.get('utm_content') || '',
  };
}

const form = document.getElementById('enquiry-form'); // Replace with your actual form ID
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Extract UTM parameters from current URL
  const utmParams = extractUTMParametersFromURL();

  // Log extracted UTM parameters
  console.log('Extracted UTM Parameters:', utmParams);

  // Update payloadDefaults with extracted UTM parameters
  payloadDefaults.utm_source = utmParams.utm_source;
  payloadDefaults.utm_medium = utmParams.utm_medium;
  payloadDefaults.utm_campaign = utmParams.utm_campaign;
  payloadDefaults.utm_term = utmParams.utm_term;
  payloadDefaults.utm_content = utmParams.utm_content;

  // Log updated payloadDefaults
  console.log('==>Updated Payload:', payloadDefaults); })


var timeoutID;
var recaptchaSuccess = false;

// get country codes from json file
const countries = [
  {
    "name": "Malaysia",
    "dial_code": "+60",
    "emoji": "🇲🇾",
    "code": "MY"
  },
  {
    "name": "Singapore",
    "dial_code": "+65",
    "emoji": "🇸🇬",
    "code": "SG"
  },
  {
    "name": "Afghanistan",
    "dial_code": "+93",
    "emoji": "🇦🇫",
    "code": "AF"
  },
  {
    "name": "Aland Islands",
    "dial_code": "+358",
    "emoji": "🇦🇽",
    "code": "AX"
  },
  {
    "name": "Albania",
    "dial_code": "+355",
    "emoji": "🇦🇱",
    "code": "AL"
  },
  {
    "name": "Algeria",
    "dial_code": "+213",
    "emoji": "🇩🇿",
    "code": "DZ"
  },
  {
    "name": "AmericanSamoa",
    "dial_code": "+1684",
    "emoji": "🇦🇸",
    "code": "AS"
  },
  {
    "name": "Andorra",
    "dial_code": "+376",
    "emoji": "🇦🇩",
    "code": "AD"
  },
  {
    "name": "Angola",
    "dial_code": "+244",
    "emoji": "🇦🇴",
    "code": "AO"
  },
  {
    "name": "Anguilla",
    "dial_code": "+1264",
    "emoji": "🇦🇮",
    "code": "AI"
  },
  {
    "name": "Antarctica",
    "dial_code": "+672",
    "emoji": "🇦🇶",
    "code": "AQ"
  },
  {
    "name": "Antigua and Barbuda",
    "dial_code": "+1268",
    "emoji": "🇦🇬",
    "code": "AG"
  },
  {
    "name": "Argentina",
    "dial_code": "+54",
    "emoji": "🇦🇷",
    "code": "AR"
  },
  {
    "name": "Armenia",
    "dial_code": "+374",
    "emoji": "🇦🇲",
    "code": "AM"
  },
  {
    "name": "Aruba",
    "dial_code": "+297",
    "emoji": "🇦🇼",
    "code": "AW"
  },
  {
    "name": "Australia",
    "dial_code": "+61",
    "emoji": "🇦🇺",
    "code": "AU"
  },
  {
    "name": "Austria",
    "dial_code": "+43",
    "emoji": "🇦🇹",
    "code": "AT"
  },
  {
    "name": "Azerbaijan",
    "dial_code": "+994",
    "emoji": "🇦🇿",
    "code": "AZ"
  },
  {
    "name": "Bahamas",
    "dial_code": "+1242",
    "emoji": "🇧🇸",
    "code": "BS"
  },
  {
    "name": "Bahrain",
    "dial_code": "+973",
    "emoji": "🇧🇭",
    "code": "BH"
  },
  {
    "name": "Bangladesh",
    "dial_code": "+880",
    "emoji": "🇧🇩",
    "code": "BD"
  },
  {
    "name": "Barbados",
    "dial_code": "+1246",
    "emoji": "🇧🇧",
    "code": "BB"
  },
  {
    "name": "Belarus",
    "dial_code": "+375",
    "emoji": "🇧🇾",
    "code": "BY"
  },
  {
    "name": "Belgium",
    "dial_code": "+32",
    "emoji": "🇧🇪",
    "code": "BE"
  },
  {
    "name": "Belize",
    "dial_code": "+501",
    "emoji": "🇧🇿",
    "code": "BZ"
  },
  {
    "name": "Benin",
    "dial_code": "+229",
    "emoji": "🇧🇯",
    "code": "BJ"
  },
  {
    "name": "Bermuda",
    "dial_code": "+1441",
    "emoji": "🇧🇲",
    "code": "BM"
  },
  {
    "name": "Bhutan",
    "dial_code": "+975",
    "emoji": "🇧🇹",
    "code": "BT"
  },
  {
    "name": "Bolivia, Plurinational State of",
    "dial_code": "+591",
    "emoji": "🇧🇴",
    "code": "BO"
  },
  {
    "name": "Bosnia and Herzegovina",
    "dial_code": "+387",
    "emoji": "🇧🇦",
    "code": "BA"
  },
  {
    "name": "Botswana",
    "dial_code": "+267",
    "emoji": "🇧🇼",
    "code": "BW"
  },
  {
    "name": "Brazil",
    "dial_code": "+55",
    "emoji": "🇧🇷",
    "code": "BR"
  },
  {
    "name": "British Indian Ocean Territory",
    "dial_code": "+246",
    "emoji": "🇮🇴",
    "code": "IO"
  },
  {
    "name": "Brunei Darussalam",
    "dial_code": "+673",
    "emoji": "🇧🇳",
    "code": "BN"
  },
  {
    "name": "Bulgaria",
    "dial_code": "+359",
    "emoji": "🇧🇬",
    "code": "BG"
  },
  {
    "name": "Burkina Faso",
    "dial_code": "+226",
    "emoji": "🇧🇫",
    "code": "BF"
  },
  {
    "name": "Burundi",
    "dial_code": "+257",
    "emoji": "🇧🇮",
    "code": "BI"
  },
  {
    "name": "Cambodia",
    "dial_code": "+855",
    "emoji": "🇰🇭",
    "code": "KH"
  },
  {
    "name": "Cameroon",
    "dial_code": "+237",
    "emoji": "🇨🇲",
    "code": "CM"
  },
  {
    "name": "Canada",
    "dial_code": "+1",
    "emoji": "🇨🇦",
    "code": "CA"
  },
  {
    "name": "Cape Verde",
    "dial_code": "+238",
    "emoji": "🇨🇻",
    "code": "CV"
  },
  {
    "name": "Cayman Islands",
    "dial_code": "+345",
    "emoji": "🇰🇾",
    "code": "KY"
  },
  {
    "name": "Central African Republic",
    "dial_code": "+236",
    "emoji": "🇨🇫",
    "code": "CF"
  },
  {
    "name": "Chad",
    "dial_code": "+235",
    "emoji": "🇹🇩",
    "code": "TD"
  },
  {
    "name": "Chile",
    "dial_code": "+56",
    "emoji": "🇨🇱",
    "code": "CL"
  },
  {
    "name": "China",
    "dial_code": "+86",
    "emoji": "🇨🇳",
    "code": "CN"
  },
  {
    "name": "Christmas Island",
    "dial_code": "+61",
    "emoji": "🇨🇽",
    "code": "CX"
  },
  {
    "name": "Cocos (Keeling) Islands",
    "dial_code": "+61",
    "emoji": "🇨🇨",
    "code": "CC"
  },
  {
    "name": "Colombia",
    "dial_code": "+57",
    "emoji": "🇨🇴",
    "code": "CO"
  },
  {
    "name": "Comoros",
    "dial_code": "+269",
    "emoji": "🇰🇲",
    "code": "KM"
  },
  {
    "name": "Congo",
    "dial_code": "+242",
    "emoji": "🇨🇬",
    "code": "CG"
  },
  {
    "name": "Congo, The Democratic Republic of the Congo",
    "dial_code": "+243",
    "emoji": "🇨🇩",
    "code": "CD"
  },
  {
    "name": "Cook Islands",
    "dial_code": "+682",
    "emoji": "🇨🇰",
    "code": "CK"
  },
  {
    "name": "Costa Rica",
    "dial_code": "+506",
    "emoji": "🇨🇷",
    "code": "CR"
  },
  {
    "name": "Cote d'Ivoire",
    "dial_code": "+225",
    "emoji": "🇨🇮",
    "code": "CI"
  },
  {
    "name": "Croatia",
    "dial_code": "+385",
    "emoji": "🇭🇷",
    "code": "HR"
  },
  {
    "name": "Cuba",
    "dial_code": "+53",
    "emoji": "🇨🇺",
    "code": "CU"
  },
  {
    "name": "Cyprus",
    "dial_code": "+357",
    "emoji": "🇨🇾",
    "code": "CY"
  },
  {
    "name": "Czech Republic",
    "dial_code": "+420",
    "emoji": "🇨🇿",
    "code": "CZ"
  },
  {
    "name": "Denmark",
    "dial_code": "+45",
    "emoji": "🇩🇰",
    "code": "DK"
  },
  {
    "name": "Djibouti",
    "dial_code": "+253",
    "emoji": "🇩🇯",
    "code": "DJ"
  },
  {
    "name": "Dominica",
    "dial_code": "+1767",
    "emoji": "🇩🇲",
    "code": "DM"
  },
  {
    "name": "Dominican Republic",
    "dial_code": "+1849",
    "emoji": "🇩🇴",
    "code": "DO"
  },
  {
    "name": "Ecuador",
    "dial_code": "+593",
    "emoji": "🇪🇨",
    "code": "EC"
  },
  {
    "name": "Egypt",
    "dial_code": "+20",
    "emoji": "🇪🇬",
    "code": "EG"
  },
  {
    "name": "El Salvador",
    "dial_code": "+503",
    "emoji": "🇸🇻",
    "code": "SV"
  },
  {
    "name": "Equatorial Guinea",
    "dial_code": "+240",
    "emoji": "🇬🇶",
    "code": "GQ"
  },
  {
    "name": "Eritrea",
    "dial_code": "+291",
    "emoji": "🇪🇷",
    "code": "ER"
  },
  {
    "name": "Estonia",
    "dial_code": "+372",
    "emoji": "🇪🇪",
    "code": "EE"
  },
  {
    "name": "Ethiopia",
    "dial_code": "+251",
    "emoji": "🇪🇹",
    "code": "ET"
  },
  {
    "name": "Falkland Islands (Malvinas)",
    "dial_code": "+500",
    "emoji": "🇫🇰",
    "code": "FK"
  },
  {
    "name": "Faroe Islands",
    "dial_code": "+298",
    "emoji": "🇫🇴",
    "code": "FO"
  },
  {
    "name": "Fiji",
    "dial_code": "+679",
    "emoji": "🇫🇯",
    "code": "FJ"
  },
  {
    "name": "Finland",
    "dial_code": "+358",
    "emoji": "🇫🇮",
    "code": "FI"
  },
  {
    "name": "France",
    "dial_code": "+33",
    "emoji": "🇫🇷",
    "code": "FR"
  },
  {
    "name": "French Guiana",
    "dial_code": "+594",
    "emoji": "🇬🇫",
    "code": "GF"
  },
  {
    "name": "French Polynesia",
    "dial_code": "+689",
    "emoji": "🇵🇫",
    "code": "PF"
  },
  {
    "name": "Gabon",
    "dial_code": "+241",
    "emoji": "🇬🇦",
    "code": "GA"
  },
  {
    "name": "Gambia",
    "dial_code": "+220",
    "emoji": "🇬🇲",
    "code": "GM"
  },
  {
    "name": "Georgia",
    "dial_code": "+995",
    "emoji": "🇬🇪",
    "code": "GE"
  },
  {
    "name": "Germany",
    "dial_code": "+49",
    "emoji": "🇩🇪",
    "code": "DE"
  },
  {
    "name": "Ghana",
    "dial_code": "+233",
    "emoji": "🇬🇭",
    "code": "GH"
  },
  {
    "name": "Gibraltar",
    "dial_code": "+350",
    "emoji": "🇬🇮",
    "code": "GI"
  },
  {
    "name": "Greece",
    "dial_code": "+30",
    "emoji": "🇬🇷",
    "code": "GR"
  },
  {
    "name": "Greenland",
    "dial_code": "+299",
    "emoji": "🇬🇱",
    "code": "GL"
  },
  {
    "name": "Grenada",
    "dial_code": "+1473",
    "emoji": "🇬🇩",
    "code": "GD"
  },
  {
    "name": "Guadeloupe",
    "dial_code": "+590",
    "emoji": "🇬🇵",
    "code": "GP"
  },
  {
    "name": "Guam",
    "dial_code": "+1671",
    "emoji": "🇬🇺",
    "code": "GU"
  },
  {
    "name": "Guatemala",
    "dial_code": "+502",
    "emoji": "🇬🇹",
    "code": "GT"
  },
  {
    "name": "Guernsey",
    "dial_code": "+44",
    "emoji": "🇬🇬",
    "code": "GG"
  },
  {
    "name": "Guinea",
    "dial_code": "+224",
    "emoji": "🇬🇳",
    "code": "GN"
  },
  {
    "name": "Guinea-Bissau",
    "dial_code": "+245",
    "emoji": "🇬🇼",
    "code": "GW"
  },
  {
    "name": "Guyana",
    "dial_code": "+595",
    "emoji": "🇬🇾",
    "code": "GY"
  },
  {
    "name": "Haiti",
    "dial_code": "+509",
    "emoji": "🇭🇹",
    "code": "HT"
  },
  {
    "name": "Holy See (Vatican City State)",
    "dial_code": "+379",
    "emoji": "🇻🇦",
    "code": "VA"
  },
  {
    "name": "Honduras",
    "dial_code": "+504",
    "emoji": "🇭🇳",
    "code": "HN"
  },
  {
    "name": "Hong Kong",
    "dial_code": "+852",
    "emoji": "🇭🇰",
    "code": "HK"
  },
  {
    "name": "Hungary",
    "dial_code": "+36",
    "emoji": "🇭🇺",
    "code": "HU"
  },
  {
    "name": "Iceland",
    "dial_code": "+354",
    "emoji": "🇮🇸",
    "code": "IS"
  },
  {
    "name": "India",
    "dial_code": "+91",
    "emoji": "🇮🇳",
    "code": "IN"
  },
  {
    "name": "Indonesia",
    "dial_code": "+62",
    "emoji": "🇮🇩",
    "code": "ID"
  },
  {
    "name": "Iran, Islamic Republic of Persian Gulf",
    "dial_code": "+98",
    "emoji": "🇮🇷",
    "code": "IR"
  },
  {
    "name": "Iraq",
    "dial_code": "+964",
    "emoji": "🇮🇷",
    "code": "IQ"
  },
  {
    "name": "Ireland",
    "dial_code": "+353",
    "emoji": "🇮🇪",
    "code": "IE"
  },
  {
    "name": "Isle of Man",
    "dial_code": "+44",
    "emoji": "🇮🇲",
    "code": "IM"
  },
  {
    "name": "Israel",
    "dial_code": "+972",
    "emoji": "🇮🇱",
    "code": "IL"
  },
  {
    "name": "Italy",
    "dial_code": "+39",
    "emoji": "🇮🇹",
    "code": "IT"
  },
  {
    "name": "Jamaica",
    "dial_code": "+1876",
    "emoji": "🇯🇲",
    "code": "JM"
  },
  {
    "name": "Japan",
    "dial_code": "+81",
    "emoji": "🇯🇵",
    "code": "JP"
  },
  {
    "name": "Jersey",
    "dial_code": "+44",
    "emoji": "🇯🇪",
    "code": "JE"
  },
  {
    "name": "Jordan",
    "dial_code": "+962",
    "emoji": "🇯🇴",
    "code": "JO"
  },
  {
    "name": "Kazakhstan",
    "dial_code": "+77",
    "emoji": "🇰🇿",
    "code": "KZ"
  },
  {
    "name": "Kenya",
    "dial_code": "+254",
    "emoji": "🇰🇪",
    "code": "KE"
  },
  {
    "name": "Kiribati",
    "dial_code": "+686",
    "emoji": "🇰🇮",
    "code": "KI"
  },
  {
    "name": "Korea, Democratic People's Republic of Korea",
    "dial_code": "+850",
    "emoji": "🇰🇵",
    "code": "KP"
  },
  {
    "name": "Korea, Republic of South Korea",
    "dial_code": "+82",
    "emoji": "🇰🇷",
    "code": "KR"
  },
  {
    "name": "Kuwait",
    "dial_code": "+965",
    "emoji": "🇰🇼",
    "code": "KW"
  },
  {
    "name": "Kyrgyzstan",
    "dial_code": "+996",
    "emoji": "🇰🇬",
    "code": "KG"
  },
  {
    "name": "Laos",
    "dial_code": "+856",
    "emoji": "🇱🇦",
    "code": "LA"
  },
  {
    "name": "Latvia",
    "dial_code": "+371",
    "emoji": "🇱🇻",
    "code": "LV"
  },
  {
    "name": "Lebanon",
    "dial_code": "+961",
    "emoji": "🇱🇧",
    "code": "LB"
  },
  {
    "name": "Lesotho",
    "dial_code": "+266",
    "emoji": "🇱🇸",
    "code": "LS"
  },
  {
    "name": "Liberia",
    "dial_code": "+231",
    "emoji": "🇱🇷",
    "code": "LR"
  },
  {
    "name": "Libyan Arab Jamahiriya",
    "dial_code": "+218",
    "emoji": "🇱🇾",
    "code": "LY"
  },
  {
    "name": "Liechtenstein",
    "dial_code": "+423",
    "emoji": "🇱🇮",
    "code": "LI"
  },
  {
    "name": "Lithuania",
    "dial_code": "+370",
    "emoji": "🇱🇹",
    "code": "LT"
  },
  {
    "name": "Luxembourg",
    "dial_code": "+352",
    "emoji": "🇱🇺",
    "code": "LU"
  },
  {
    "name": "Macao",
    "dial_code": "+853",
    "emoji": "🇲🇴",
    "code": "MO"
  },
  {
    "name": "Macedonia",
    "dial_code": "+389",
    "emoji": "🇲🇰",
    "code": "MK"
  },
  {
    "name": "Madagascar",
    "dial_code": "+261",
    "emoji": "🇲🇬",
    "code": "MG"
  },
  {
    "name": "Malawi",
    "dial_code": "+265",
    "emoji": "🇲🇼",
    "code": "MW"
  },

  {
    "name": "Maldives",
    "dial_code": "+960",
    "emoji": "🇲🇻",
    "code": "MV"
  },
  {
    "name": "Mali",
    "dial_code": "+223",
    "emoji": "🇲🇱",
    "code": "ML"
  },
  {
    "name": "Malta",
    "dial_code": "+356",
    "emoji": "🇲🇹",
    "code": "MT"
  },
  {
    "name": "Marshall Islands",
    "dial_code": "+692",
    "emoji": "🇲🇭",
    "code": "MH"
  },
  {
    "name": "Martinique",
    "dial_code": "+596",
    "emoji": "🇲🇶",
    "code": "MQ"
  },
  {
    "name": "Mauritania",
    "dial_code": "+222",
    "emoji": "🇲🇷",
    "code": "MR"
  },
  {
    "name": "Mauritius",
    "dial_code": "+230",
    "emoji": "🇲🇺",
    "code": "MU"
  },
  {
    "name": "Mayotte",
    "dial_code": "+262",
    "emoji": "🇾🇹",
    "code": "YT"
  },
  {
    "name": "Mexico",
    "dial_code": "+52",
    "emoji": "🇲🇽",
    "code": "MX"
  },
  {
    "name": "Micronesia, Federated States of Micronesia",
    "dial_code": "+691",
    "emoji": "🇫🇲",
    "code": "FM"
  },
  {
    "name": "Moldova",
    "dial_code": "+373",
    "emoji": "🇲🇩",
    "code": "MD"
  },
  {
    "name": "Monaco",
    "dial_code": "+377",
    "emoji": "🇲🇨",
    "code": "MC"
  },
  {
    "name": "Mongolia",
    "dial_code": "+976",
    "emoji": "🇲🇳",
    "code": "MN"
  },
  {
    "name": "Montenegro",
    "dial_code": "+382",
    "emoji": "🇲🇪",
    "code": "ME"
  },
  {
    "name": "Montserrat",
    "dial_code": "+1664",
    "emoji": "🇲🇸",
    "code": "MS"
  },
  {
    "name": "Morocco",
    "dial_code": "+212",
    "emoji": "🇲🇦",
    "code": "MA"
  },
  {
    "name": "Mozambique",
    "dial_code": "+258",
    "emoji": "🇲🇿",
    "code": "MZ"
  },
  {
    "name": "Myanmar",
    "dial_code": "+95",
    "emoji": "🇲🇲",
    "code": "MM"
  },
  {
    "name": "Namibia",
    "emoji": "🇳🇦",
    "dial_code": "+264",
    "code": "NA"
  },
  {
    "name": "Nauru",
    "dial_code": "+674",
    "emoji": "🇳🇷",
    "code": "NR"
  },
  {
    "name": "Nepal",
    "dial_code": "+977",
    "emoji": "🇳🇵",
    "code": "NP"
  },
  {
    "name": "Netherlands",
    "dial_code": "+31",
    "emoji": "🇳🇱",
    "code": "NL"
  },
  {
    "name": "Netherlands Antilles",
    "dial_code": "+599",
    "emoji": "🇧🇶",
    "code": "AN"
  },
  {
    "name": "New Caledonia",
    "dial_code": "+687",
    "emoji": "🇳🇨",
    "code": "NC"
  },
  {
    "name": "New Zealand",
    "dial_code": "+64",
    "emoji": "🇳🇿",
    "code": "NZ"
  },
  {
    "name": "Nicaragua",
    "dial_code": "+505",
    "emoji": "🇳🇮",
    "code": "NI"
  },
  {
    "name": "Niger",
    "dial_code": "+227",
    "emoji": "🇳🇪",
    "code": "NE"
  },
  {
    "name": "Nigeria",
    "dial_code": "+234",
    "emoji": "🇳🇬",
    "code": "NG"
  },
  {
    "name": "Niue",
    "dial_code": "+683",
    "emoji": "🇳🇺",
    "code": "NU"
  },
  {
    "name": "Norfolk Island",
    "dial_code": "+672",
    "emoji": "🇳🇫",
    "code": "NF"
  },
  {
    "name": "Northern Mariana Islands",
    "dial_code": "+1670",
    "emoji": "🇲🇵",
    "code": "MP"
  },
  {
    "name": "Norway",
    "dial_code": "+47",
    "emoji": "🇳🇴",
    "code": "NO"
  },
  {
    "name": "Oman",
    "dial_code": "+968",
    "emoji": "🇴🇲",
    "code": "OM"
  },
  {
    "name": "Pakistan",
    "dial_code": "+92",
    "emoji": "🇵🇰",
    "code": "PK"
  },
  {
    "name": "Palau",
    "dial_code": "+680",
    "emoji": "🇵🇼",
    "code": "PW"
  },
  {
    "name": "Palestinian Territory, Occupied",
    "dial_code": "+970",
    "emoji": "🇵🇸",
    "code": "PS"
  },
  {
    "name": "Panama",
    "dial_code": "+507",
    "emoji": "🇵🇦",
    "code": "PA"
  },
  {
    "name": "Papua New Guinea",
    "dial_code": "+675",
    "emoji": "🇵🇬",
    "code": "PG"
  },
  {
    "name": "Paraguay",
    "dial_code": "+595",
    "emoji": "🇵🇾",
    "code": "PY"
  },
  {
    "name": "Peru",
    "dial_code": "+51",
    "emoji": "🇵🇪",
    "code": "PE"
  },
  {
    "name": "Philippines",
    "dial_code": "+63",
    "emoji": "🇵🇭",
    "code": "PH"
  },
  {
    "name": "Pitcairn",
    "dial_code": "+872",
    "emoji": "🇵🇳",
    "code": "PN"
  },
  {
    "name": "Poland",
    "dial_code": "+48",
    "emoji": "🇵🇱",
    "code": "PL"
  },
  {
    "name": "Portugal",
    "dial_code": "+351",
    "emoji": "🇵🇹",
    "code": "PT"
  },
  {
    "name": "Puerto Rico",
    "dial_code": "+1939",
    "emoji": "🇵🇷",
    "code": "PR"
  },
  {
    "name": "Qatar",
    "dial_code": "+974",
    "emoji": "🇶🇦",
    "code": "QA"
  },
  {
    "name": "Romania",
    "dial_code": "+40",
    "emoji": "🇷🇴",
    "code": "RO"
  },
  {
    "name": "Russia",
    "dial_code": "+7",
    "emoji": "🇷🇺",
    "code": "RU"
  },
  {
    "name": "Rwanda",
    "dial_code": "+250",
    "emoji": "🇷🇼",
    "code": "RW"
  },
  {
    "name": "Reunion",
    "dial_code": "+262",
    "emoji": "🇷🇪",
    "code": "RE"
  },
  {
    "name": "Saint Barthelemy",
    "dial_code": "+590",
    "emoji": "🇧🇱",
    "code": "BL"
  },
  {
    "name": "Saint Helena, Ascension and Tristan Da Cunha",
    "dial_code": "+290",
    "emoji": "🇸🇭",
    "code": "SH"
  },
  {
    "name": "Saint Kitts and Nevis",
    "dial_code": "+1869",
    "emoji": "🇰🇳",
    "code": "KN"
  },
  {
    "name": "Saint Lucia",
    "dial_code": "+1758",
    "emoji": "🇱🇨",
    "code": "LC"
  },
  {
    "name": "Saint Martin",
    "dial_code": "+590",
    "emoji": "🇲🇫",
    "code": "MF"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "dial_code": "+508",
    "emoji": "🇵🇲",
    "code": "PM"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "dial_code": "+1784",
    "emoji": "🇻🇨",
    "code": "VC"
  },
  {
    "name": "Samoa",
    "dial_code": "+685",
    "emoji": "🇼🇸",
    "code": "WS"
  },
  {
    "name": "San Marino",
    "dial_code": "+378",
    "emoji": "🇸🇲",
    "code": "SM"
  },
  {
    "name": "Sao Tome and Principe",
    "dial_code": "+239",
    "emoji": "🇸🇹",
    "code": "ST"
  },
  {
    "name": "Saudi Arabia",
    "dial_code": "+966",
    "emoji": "🇸🇦",
    "code": "SA"
  },
  {
    "name": "Senegal",
    "dial_code": "+221",
    "emoji": "🇸🇳",
    "code": "SN"
  },
  {
    "name": "Serbia",
    "dial_code": "+381",
    "emoji": "🇷🇸",
    "code": "RS"
  },
  {
    "name": "Seychelles",
    "dial_code": "+248",
    "emoji": "🇸🇨",
    "code": "SC"
  },
  {
    "name": "Sierra Leone",
    "dial_code": "+232",
    "emoji": "🇸🇱",
    "code": "SL"
  },

  {
    "name": "Slovakia",
    "dial_code": "+421",
    "emoji": "🇸🇰",
    "code": "SK"
  },
  {
    "name": "Slovenia",
    "dial_code": "+386",
    "emoji": "🇸🇮",
    "code": "SI"
  },
  {
    "name": "Solomon Islands",
    "dial_code": "+677",
    "emoji": "🇸🇧",
    "code": "SB"
  },
  {
    "name": "Somalia",
    "dial_code": "+252",
    "emoji": "🇸🇴",
    "code": "SO"
  },
  {
    "name": "South Africa",
    "dial_code": "+27",
    "emoji": "🇿🇦",
    "code": "ZA"
  },
  {
    "name": "South Sudan",
    "dial_code": "+211",
    "emoji": "🇸🇸",
    "code": "SS"
  },
  {
    "name": "South Georgia and the South Sandwich Islands",
    "dial_code": "+500",
    "emoji": "🇬🇸",
    "code": "GS"
  },
  {
    "name": "Spain",
    "dial_code": "+34",
    "emoji": "🇪🇸",
    "code": "ES"
  },
  {
    "name": "Sri Lanka",
    "dial_code": "+94",
    "emoji": "🇱🇰",
    "code": "LK"
  },
  {
    "name": "Sudan",
    "dial_code": "+249",
    "emoji": "🇸🇩",
    "code": "SD"
  },
  {
    "name": "Suriname",
    "dial_code": "+597",
    "emoji": "🇸🇷",
    "code": "SR"
  },
  {
    "name": "Svalbard and Jan Mayen",
    "dial_code": "+47",
    "emoji": "🇸🇯",
    "code": "SJ"
  },
  {
    "name": "Swaziland",
    "dial_code": "+268",
    "emoji": "🇸🇿",
    "code": "SZ"
  },
  {
    "name": "Sweden",
    "dial_code": "+46",
    "emoji": "🇸🇪",
    "code": "SE"
  },
  {
    "name": "Switzerland",
    "dial_code": "+41",
    "emoji": "🇨🇭",
    "code": "CH"
  },
  {
    "name": "Syrian Arab Republic",
    "dial_code": "+963",
    "emoji": "🇸🇾",
    "code": "SY"
  },
  {
    "name": "Taiwan",
    "dial_code": "+886",
    "emoji": "🇹🇼",
    "code": "TW"
  },
  {
    "name": "Tajikistan",
    "dial_code": "+992",
    "emoji": "🇹🇯",
    "code": "TJ"
  },
  {
    "name": "Tanzania, United Republic of Tanzania",
    "dial_code": "+255",
    "emoji": "🇹🇿",
    "code": "TZ"
  },
  {
    "name": "Thailand",
    "dial_code": "+66",
    "emoji": "🇹🇭",
    "code": "TH"
  },
  {
    "name": "Timor-Leste",
    "dial_code": "+670",
    "emoji": "🇹🇱",
    "code": "TL"
  },
  {
    "name": "Togo",
    "dial_code": "+228",
    "emoji": "🇹🇬",
    "code": "TG"
  },
  {
    "name": "Tokelau",
    "dial_code": "+690",
    "emoji": "🇹🇰",
    "code": "TK"
  },
  {
    "name": "Tonga",
    "dial_code": "+676",
    "emoji": "🇹🇴",
    "code": "TO"
  },
  {
    "name": "Trinidad and Tobago",
    "dial_code": "+1868",
    "emoji": "🇹🇹",
    "code": "TT"
  },
  {
    "name": "Tunisia",
    "dial_code": "+216",
    "emoji": "🇹🇳",
    "code": "TN"
  },
  {
    "name": "Turkey",
    "dial_code": "+90",
    "emoji": "🇹🇷",
    "code": "TR"
  },
  {
    "name": "Turkmenistan",
    "dial_code": "+993",
    "emoji": "🇹🇲",
    "code": "TM"
  },
  {
    "name": "Turks and Caicos Islands",
    "dial_code": "+1649",
    "emoji": "🇹🇨",
    "code": "TC"
  },
  {
    "name": "Tuvalu",
    "dial_code": "+688",
    "emoji": "🇹🇻",
    "code": "TV"
  },
  {
    "name": "Uganda",
    "dial_code": "+256",
    "emoji": "🇺🇬",
    "code": "UG"
  },
  {
    "name": "Ukraine",
    "dial_code": "+380",
    "emoji": "🇺🇦",
    "code": "UA"
  },
  {
    "name": "United Arab Emirates",
    "dial_code": "+971",
    "emoji": "🇦🇪",
    "code": "AE"
  },
  {
    "name": "United Kingdom",
    "dial_code": "+44",
    "emoji": "🇬🇧",
    "code": "GB"
  },
  {
    "name": "United States",
    "dial_code": "+1",
    "emoji": "🇺🇸",
    "code": "US"
  },
  {
    "name": "Uruguay",
    "dial_code": "+598",
    "emoji": "🇺🇾",
    "code": "UY"
  },
  {
    "name": "Uzbekistan",
    "dial_code": "+998",
    "emoji": "🇺🇿",
    "code": "UZ"
  },
  {
    "name": "Vanuatu",
    "dial_code": "+678",
    "emoji": "🇻🇺",
    "code": "VU"
  },
  {
    "name": "Venezuela, Bolivarian Republic of Venezuela",
    "dial_code": "+58",
    "emoji": "🇻🇪",
    "code": "VE"
  },
  {
    "name": "Vietnam",
    "dial_code": "+84",
    "emoji": "🇻🇳",
    "code": "VN"
  },
  {
    "name": "Virgin Islands, British",
    "dial_code": "+1284",
    "emoji": "🇻🇬",
    "code": "VG"
  },
  {
    "name": "Virgin Islands, U.S.",
    "dial_code": "+1340",
    "emoji": "🇻🇮",
    "code": "VI"
  },
  {
    "name": "Wallis and Futuna",
    "dial_code": "+681",
    "emoji": "🇼🇫",
    "code": "WF"
  },
  {
    "name": "Yemen",
    "dial_code": "+967",
    "emoji": "🇾🇪",
    "code": "YE"
  },
  {
    "name": "Zambia",
    "dial_code": "+260",
    "emoji": "🇿🇲",
    "code": "ZM"
  },
  {
    "name": "Zimbabwe",
    "dial_code": "+263",
    "emoji": "🇿🇼",
    "code": "ZW"
  },
];
 

// Create option element for country code
function createOption(country) {
  const optionElement = $("<option>")
    .attr("value", country.dial_code)
    .text(`${country.name} ${country.emoji} (${country.dial_code})`);

  return optionElement;
}

// Validate phone number using libphonenumber-js
function validatePhone(phone) {
  try {
    const phoneNumber = new libphonenumber.parsePhoneNumberWithError(phone);
    return phoneNumber.isValid();
  } catch (error) {
    return false;
  }
}

// Validate form fields
function validateForm(formData) {
  const { fullname, email, phone, countryCode } = formData;
  let isValid = true;
  if (fullname === "") {
    $("#fullname").addClass("error");
    $("#fullname-error").text("Name is required");
    isValid = false;
  }

  if (email === "") {
    $("#email").addClass("error");
    $("#email-error").text("Email is required");
    isValid = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    $("#email").addClass("error");
    $("#email-error").text("Invalid email address");
    isValid = false;
  }

  if (phone === "") {
    $("#mobile").addClass("error");
    $("#phone-error").text("Phone number is required");
    isValid = false;
  } else if (!validatePhone(`${countryCode}${phone}`)) {
    $("#mobile").addClass("error");
    $("#phone-error").text("Invalid phone number");
    isValid = false;
  }

  return isValid;
}

// Populate country codes in select element
function populateCountryCodes(countries) {
  const countryCodes = countries.map(createOption);
  $("#country-code").append(countryCodes);
  $('#country-code option:contains("+60")').prop("selected", true);
  $("#country-code-display").val("+60");
}

// Show success notification and hide after 5 seconds
function showSuccessNotification() {
  $("#success-notification")
    .removeClass("-bottom-full opacity-0")
    .addClass("bottom-4 opacity-100");

  timeoutID = setTimeout(() => {
    $("#success-notification")
      .removeClass("bottom-4 opacity-100")
      .addClass("-bottom-full opacity-0");
  }, 5000);
}

// Show error notification and hide after 5 seconds
function showErrorMessage() {
  $("#error-notification")
    .removeClass("-bottom-full opacity-0")
    .addClass("bottom-4 opacity-100");

  timeoutID = setTimeout(() => {
    $("#error-notification")
      .removeClass("bottom-4 opacity-100")
      .addClass("-bottom-full opacity-0");
  }, 5000);
}

// Show submitting notification
function showSubmittingNotification() {
  $("#submitting-notification")
    .removeClass("-bottom-full opacity-0")
    .addClass("bottom-4 opacity-100");
}

// Hide submitting notification
function hideSubmittingNotification() {
  $("#submitting-notification")
    .removeClass("bottom-4 opacity-100")
    .addClass("-bottom-full opacity-0");
}

$(document).ready(function () {
  // Fetch country codes and populate select element
  // countries.then(populateCountryCodes);
  populateCountryCodes(countries);

  // Form submission
  $("#enquiry-form").on("submit", function (e) {
    e.preventDefault();
    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const countryCode = $("#country-code").val();
    const phone = $("#mobile").val();

    // Form datafor validation
    const formData = {
      fullname,
      email,
      phone,
      countryCode,
    };

    // Validate form fields before submission
    if (!validateForm(formData)) {
      //  return
      return;
    }

    // for testing only - remove when reCAPTCHA is implemented
    // recaptchaSuccess = true;

    // Check if reCAPTCHA challenge is completed
    if (!recaptchaSuccess) {
      alert("Please complete the reCAPTCHA challenge");
      return;
    }

    // Form payload
    const formPayload = {
      name: fullname,
      email,
      mobile: `${countryCode.replace("+", "")}${phone}`,
      ...payloadDefaults,
    };

    // Show submitting notification
    showSubmittingNotification();
    $("#form-submit").prop("disabled", true);

    // Submit form data to endpoint
    fetch(formEndpoint, {
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
        console.log(response);
        showSuccessNotification();
      })
      .catch((error) => {
        showErrorMessage();
        console.error(error);
      })
      .finally(() => {
        hideSubmittingNotification();
        $("#form-submit").prop("disabled", !recaptchaSuccess);
      });
  });

  $("#close-success").on("click", function () {
    if ($("#success-notification").hasClass("opacity-0")) {
      return;
    }

    clearTimeout(timeoutID);
    $("#success-notification")
      .removeClass("bottom-4 opacity-100")
      .addClass("-bottom-full opacity-0");
  });

  $("#close-error").on("click", function () {
    if ($("#error-notification").hasClass("opacity-0")) {
      return;
    }

    clearTimeout(timeoutID);
    $("#error-notification")
      .removeClass("bottom-4 opacity-100")
      .addClass("-bottom-full opacity-0");
  });

  $("#country-code").on("change", function () {
    const country = $(this).val();
    $("#country-code-display").val(country);
  });

  $("#mobile").on("keypress", function (e) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
  });

  $("#mobile").on("input", function () {
    $(this).removeClass("error");
    $("#phone-error").text("");
  });

  $("#fullname").on("input", function () {
    $(this).removeClass("error");
    $("#fullname-error").text("");
  });

  $("#email").on("input", function () {
    $(this).removeClass("error");
    $("#email-error").text("");
  });

  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("h-72 h-0");
  });

  $(".mobile-link").on("click", function () {
    $("#mobile-menu").toggleClass("h-72 h-0");
  });
});

function onRecaptchaSuccess(token) {
  $("#form-submit").prop("disabled", false);
  recaptchaSuccess = true;
}

function onRecaptchaResponseExpiry() {
  $("#form-submit").prop("disabled", true);
  recaptchaSuccess = false;
}

function onRecaptchaError() {
  $("#form-submit").prop("disabled", true);
  recaptchaSuccess = false;
}
