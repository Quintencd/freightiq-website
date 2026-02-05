/* FlowIQ marketing site - Country select (custom dropdown) */
(function () {
  'use strict';

  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bonaire',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Cook Islands',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curacao',
    'Cyprus',
    'Czech Republic',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji Islands',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'North Korea',
    'Northern Ireland',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of the Congo',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Helena',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Scotland',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Virgin Islands, British',
    'Virgin Islands, U.S.',
    'Wales',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  function setupCountrySelect(root) {
    const form = root.closest('form');
    const hiddenInput = form?.querySelector('#country[name="country"]');
    const button = root.querySelector('#countryButton');
    const buttonLabel = root.querySelector('#countryButtonLabel');
    const chevron = root.querySelector('#countryChevron');
    const menu = root.querySelector('#countryMenu');
    const search = root.querySelector('#countrySearch');
    const list = root.querySelector('#countryList');
    const error = root.querySelector('#countryError');

    if (!form || !hiddenInput || !button || !buttonLabel || !menu || !search || !list || !error) return;

    function setButtonText(value) {
      if (!value) {
        buttonLabel.textContent = 'Select a country';
        buttonLabel.classList.remove('text-slate-900');
        buttonLabel.classList.add('text-slate-400');
        return;
      }
      buttonLabel.textContent = value;
      buttonLabel.classList.remove('text-slate-400');
      buttonLabel.classList.add('text-slate-900');
    }

    function openMenu() {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
      chevron?.classList.add('rotate-180');
      renderList();
      window.setTimeout(() => search.focus(), 0);
    }

    function closeMenu() {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      chevron?.classList.remove('rotate-180');
      search.value = '';
      renderList();
    }

    function isOpen() {
      return !menu.classList.contains('hidden');
    }

    function selectCountry(name) {
      hiddenInput.value = name;
      setButtonText(name);
      error.classList.add('hidden');
      closeMenu();
    }

    function renderList() {
      const query = (search.value || '').trim().toLowerCase();
      const selected = hiddenInput.value || '';
      const items = query ? countries.filter((c) => c.toLowerCase().includes(query)) : countries;

      list.innerHTML = '';

      if (items.length === 0) {
        const li = document.createElement('li');
        li.className = 'px-4 py-2 text-sm text-slate-500';
        li.textContent = 'No matches';
        list.appendChild(li);
        return;
      }

      for (const name of items) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('role', 'option');
        btn.setAttribute('aria-selected', name === selected ? 'true' : 'false');
        btn.className =
          'w-full text-left px-4 py-2 text-sm text-slate-900 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none';

        if (name === selected) {
          btn.className =
            'w-full text-left px-4 py-2 text-sm text-orange-700 bg-orange-50 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none';
        }

        btn.textContent = name;
        btn.addEventListener('click', () => selectCountry(name));
        li.appendChild(btn);
        list.appendChild(li);
      }
    }

    button.addEventListener('click', () => {
      if (isOpen()) closeMenu();
      else openMenu();
    });

    search.addEventListener('input', renderList);

    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      if (root.contains(e.target)) return;
      closeMenu();
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        closeMenu();
        button.focus();
      }
    });

    form.addEventListener('submit', (e) => {
      if (hiddenInput.value) return;
      e.preventDefault();
      error.classList.remove('hidden');
      openMenu();
    });

    setButtonText(hiddenInput.value);
    renderList();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-country-select]').forEach(setupCountrySelect);
  });
})();

