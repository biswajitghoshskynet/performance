'use client'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatableSelect from 'react-select/creatable';


export default function FormUpdateContact({ id, setReload, reload }) {
    const [mounted, setMounted] = useState(false);
    let data = {}

    const [photo, setPhoto] = useState('')
    const [name, setName] = useState(
        {
            prefix: '',
            name: '',
            suffix: ''
        }
    )
    const [organization, setOrganization] = useState(
        {
            company: '',
            jobtitle: '',
            department: ''
        }
    )
    const [email, setEmail] = useState(
        [
            {
                email: '',
                emailtype: ''
            }
        ]
    )
    const [phonelist, setPhonelist] = useState(
        [
            {
                countrycode: '',
                phone: '',
                phonetype: ''
            },
        ]
    )
    const [addresslist, setAddresslist] = useState(
        [
            {
                country: '',
                street: '',
                city: '',
                pincode: '',
                pobox: '',
                addresstype: ''
            }
        ]
    )
    const [dob, setDob] = useState('')
    const [notes, setNotes] = useState('')
    const [label, setLebel] = useState('')
    const [selectedLabelOption, setSelectedLabelOption] = useState(null);



    const validEmail = (email) => {
        let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return validRegex.test(email)
    }

    const validPhone = (phone) => {
        let validRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return validRegex.test(phone)
    }

    useEffect(() => {
        setMounted(true)
        getData()
    }, [])

    const getData = async () => {
        data = await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store'
        })
        data = await data.json()
        if (data?.success === true) {
            setPhoto(data.data.photo)
            setName(data.data.name)
            setOrganization(data.data.organization)
            setEmail(data.data.email)
            setPhonelist(data.data.phonelist)
            setAddresslist(data.data.addresslist)
            setDob(data.data.dob)
            setNotes(data.data.notes)
            setLebel(data.data.label)
            setSelectedLabelOption(data.data.label)

        }
    }

    const addPhone = () => {
        const add = [...phonelist, {
            countrycode: '',
            phone: '',
            phonetype: ''
        }]
        setPhonelist(add)
    }
    const addEmail = () => {
        const add = [...email,
        {
            email: '',
            emailtype: ''
        }
        ]
        setEmail(add)
    }
    const addAddress = () => {
        const add = [...addresslist,
        {
            country: '',
            street: '',
            city: '',
            pincode: '',
            pobox: '',
            addresstype: ''
        }]
        setAddresslist(add)
    }


    const formHandle = async (e) => {
        e.preventDefault();
        const sendData = async () => {
            await fetch(`${process.env.HOST}api/contact/${id}`, {
                cache: 'no-store',
                method: "PUT",
                body: JSON.stringify({ photo, name, organization, email, phonelist, addresslist, dob, notes, label })
            }).then(() => {
                toast.success('Update complete');
            }).then(() => {
                setReload(reload + 1)
            })

        }
        let isValidEmail = 0
        let isValidPhone = 0

        email.forEach(item => {
            if (validEmail(item.email)) {
                isValidEmail = isValidEmail + 1
            }
        });
        phonelist.forEach(item => {
            if (validPhone(item.phone)) {
                isValidPhone = isValidPhone + 1
            }
        });

        if (isValidEmail == email.length) {
            if (isValidPhone == phonelist.length) {
                sendData()
            }
            else {
                alert('Please enter valid phone')
            }

        }
        else {
            alert('Please enter valid email')
        }

    }

    const labelOptions = [
        { value: 'Friend', label: 'Friend' },
        { value: 'Family', label: 'Family' },
        { value: 'Office', label: 'Office' },
        { value: label, label: label },
    ]
    const phoneLabelOptions = [
        { value: 'Mobile', label: 'Mobile' },
        { value: 'Home', label: 'Home' },
        { value: 'Office', label: 'Office' }
    ]
    const emailLabelOptions = [
        { value: 'Friend', label: 'Friend' },
        { value: 'Personal', label: 'Personal' },
        { value: 'Office', label: 'Office' },

    ]
    const addressLabelOptions = [
        { value: 'Home', label: 'Home' },
        { value: 'Office', label: 'Office' }
    ]

    return mounted && (
        <>
            <h2>Update Information</h2>




            <div className='mb-2'>
                <form onSubmit={formHandle} className='position-relative'>
                    <div className='topUpdateBtn'>
                        <button type='submit' className='btn btn-success'><span class="material-icons-outlined">done</span></button>
                    </div>
                    {/* photo */}
                    <div className='mb-2'><input type="text" value={photo} className='form-control' id='photo' name='photo' placeholder='Photo' onChange={(e) => { setPhoto(e.target.value) }} /></div>

                    {/* name */}
                    <div className='mb-2'>
                        <div className='row gx-2'>
                            <div className='col-md-3'>
                                <select className="form-select" id="prefix" name='prefix' onChange={(e) => {
                                    let value = { ...name }
                                    value.prefix = e.target.value
                                    setName(value)
                                }}>

                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                </select>

                            </div>
                            <div className='col-md-6'>
                                <input type="text" required value={name.name} className='form-control'
                                    id='name' name='name' placeholder='Name'
                                    onChange={(e) => {
                                        let value = { ...name }
                                        value.name = e.target.value
                                        setName(value)
                                    }} />
                            </div>
                            <div className='col-md-3'>
                                <input type="text" value={name.suffix} className='form-control'
                                    id='suffix' name='suffix' placeholder='Suffix'
                                    onChange={(e) => {
                                        let value = { ...name }
                                        value.suffix = e.target.value
                                        setName(value)
                                    }} />
                            </div>
                        </div>
                    </div>

                    {/* organization */}
                    <div className='mb-2'>
                        <h4 className='mb-1'>Organization</h4>
                        <div className='row gx-2'>
                            <div className='col-md-4'>
                                <input type="text" value={organization.company} className='form-control'
                                    id='company' name='company' placeholder='Company'
                                    onChange={(e) => {
                                        let value = { ...organization }
                                        value.company = e.target.value
                                        setOrganization(value)
                                    }} />
                            </div>
                            <div className='col-md-4'>
                                <input type="text" value={organization.jobtitle} className='form-control'
                                    id='jobtitle' name='jobtitle' placeholder='Job Title'
                                    onChange={(e) => {
                                        let value = { ...organization }
                                        value.jobtitle = e.target.value
                                        setOrganization(value)
                                    }} />
                            </div>
                            <div className='col-md-4'>
                                <input type="text" value={organization.department} className='form-control'
                                    id='department' name='department' placeholder='Department'
                                    onChange={(e) => {
                                        let value = { ...organization }
                                        value.department = e.target.value
                                        setOrganization(value)
                                    }} />
                            </div>
                        </div>
                    </div>

                    {/* email */}
                    <div className='mb-2'>
                        <h4 className='mb-1'>Email</h4>
                        {email.map((field, index) => (
                            <div className='mb-1' key={index}>
                                <div className="input-group">
                                    <input type="text" required className='form-control' value={field.email} id='email' name='email' placeholder='Email' onChange={(e) => {
                                        let value = [...email];
                                        value[index].email = e.target.value;
                                        setEmail(value);
                                    }} />


                                    <CreatableSelect
                                        isClearable
                                        options={emailLabelOptions}
                                        onChange={(newValue) => {
                                            let value = [...email];
                                            value[index].emailtype = newValue?.value;
                                            setEmail(value);
                                        }}

                                    />
                                    <button className="btn btn-outline-danger" type='button' onClick={
                                        () => {

                                            if (email.length > 1) {
                                                let value = [...email];
                                                delete value[index]

                                                value = value.filter(function (element) {
                                                    return element !== undefined;
                                                });
                                                setEmail(value)
                                            }
                                        }
                                    }><span className="material-icons-outlined">delete</span></button>
                                    <button type='button' className="btn btn-outline-primary" onClick={addEmail}><span className="material-icons-outlined">add</span></button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* phone */}
                    <div className='mb-2'>
                        <h4 className='mb-1'>Phone</h4>
                        {phonelist.map((field, index) => (
                            <div className='mb-1' key={index}>
                                <div className="input-group">
                                    <select className='form-control' id='countrycode' required value={field.countrycode} name='countrycode' placeholder='Countrycode' onChange={(e) => {
                                        let value = [...phonelist];
                                        value[index].countrycode = e.target.value;
                                        setPhonelist(value);
                                    }} >

                                        <option value="213">Algeria (+213)</option>
                                        <option value="376">Andorra (+376)</option>
                                        <option value="244">Angola (+244)</option>
                                        <option value="1264">Anguilla (+1264)</option>
                                        <option value="1268">Antigua &amp; Barbuda (+1268)</option>
                                        <option value="54">Argentina (+54)</option>
                                        <option value="374">Armenia (+374)</option>
                                        <option value="297">Aruba (+297)</option>
                                        <option value="61">Australia (+61)</option>
                                        <option value="43">Austria (+43)</option>
                                        <option value="994">Azerbaijan (+994)</option>
                                        <option value="1242">Bahamas (+1242)</option>
                                        <option value="973">Bahrain (+973)</option>
                                        <option value="880">Bangladesh (+880)</option>
                                        <option value="1246">Barbados (+1246)</option>
                                        <option value="375">Belarus (+375)</option>
                                        <option value="32">Belgium (+32)</option>
                                        <option value="501">Belize (+501)</option>
                                        <option value="229">Benin (+229)</option>
                                        <option value="1441">Bermuda (+1441)</option>
                                        <option value="975">Bhutan (+975)</option>
                                        <option value="591">Bolivia (+591)</option>
                                        <option value="387">Bosnia Herzegovina (+387)</option>
                                        <option value="267">Botswana (+267)</option>
                                        <option value="55">Brazil (+55)</option>
                                        <option value="673">Brunei (+673)</option>
                                        <option value="359">Bulgaria (+359)</option>
                                        <option value="226">Burkina Faso (+226)</option>
                                        <option value="257">Burundi (+257)</option>
                                        <option value="855">Cambodia (+855)</option>
                                        <option value="237">Cameroon (+237)</option>
                                        <option value="1">Canada (+1)</option>
                                        <option value="238">Cape Verde Islands (+238)</option>
                                        <option value="1345">Cayman Islands (+1345)</option>
                                        <option value="236">Central African Republic (+236)</option>
                                        <option value="56">Chile (+56)</option>
                                        <option value="86">China (+86)</option>
                                        <option value="57">Colombia (+57)</option>
                                        <option value="269">Comoros (+269)</option>
                                        <option value="242">Congo (+242)</option>
                                        <option value="682">Cook Islands (+682)</option>
                                        <option value="506">Costa Rica (+506)</option>
                                        <option value="385">Croatia (+385)</option>
                                        <option value="53">Cuba (+53)</option>
                                        <option value="90392">Cyprus North (+90392)</option>
                                        <option value="357">Cyprus South (+357)</option>
                                        <option value="42">Czech Republic (+42)</option>
                                        <option value="45">Denmark (+45)</option>
                                        <option value="253">Djibouti (+253)</option>
                                        <option value="1809">Dominica (+1809)</option>
                                        <option value="1809">Dominican Republic (+1809)</option>
                                        <option value="593">Ecuador (+593)</option>
                                        <option value="20">Egypt (+20)</option>
                                        <option value="503">El Salvador (+503)</option>
                                        <option value="240">Equatorial Guinea (+240)</option>
                                        <option value="291">Eritrea (+291)</option>
                                        <option value="372">Estonia (+372)</option>
                                        <option value="251">Ethiopia (+251)</option>
                                        <option value="500">Falkland Islands (+500)</option>
                                        <option value="298">Faroe Islands (+298)</option>
                                        <option value="679">Fiji (+679)</option>
                                        <option value="358">Finland (+358)</option>
                                        <option value="33">France (+33)</option>
                                        <option value="594">French Guiana (+594)</option>
                                        <option value="689">French Polynesia (+689)</option>
                                        <option value="241">Gabon (+241)</option>
                                        <option value="220">Gambia (+220)</option>
                                        <option value="7880">Georgia (+7880)</option>
                                        <option value="49">Germany (+49)</option>
                                        <option value="233">Ghana (+233)</option>
                                        <option value="350">Gibraltar (+350)</option>
                                        <option value="30">Greece (+30)</option>
                                        <option value="299">Greenland (+299)</option>
                                        <option value="1473">Grenada (+1473)</option>
                                        <option value="590">Guadeloupe (+590)</option>
                                        <option value="671">Guam (+671)</option>
                                        <option value="502">Guatemala (+502)</option>
                                        <option value="224">Guinea (+224)</option>
                                        <option value="245">Guinea - Bissau (+245)</option>
                                        <option value="592">Guyana (+592)</option>
                                        <option value="509">Haiti (+509)</option>
                                        <option value="504">Honduras (+504)</option>
                                        <option value="852">Hong Kong (+852)</option>
                                        <option value="36">Hungary (+36)</option>
                                        <option value="354">Iceland (+354)</option>
                                        <option value="91">India (+91)</option>
                                        <option value="62">Indonesia (+62)</option>
                                        <option value="98">Iran (+98)</option>
                                        <option value="964">Iraq (+964)</option>
                                        <option value="353">Ireland (+353)</option>
                                        <option value="972">Israel (+972)</option>
                                        <option value="39">Italy (+39)</option>
                                        <option value="1876">Jamaica (+1876)</option>
                                        <option value="81">Japan (+81)</option>
                                        <option value="962">Jordan (+962)</option>
                                        <option value="7">Kazakhstan (+7)</option>
                                        <option value="254">Kenya (+254)</option>
                                        <option value="686">Kiribati (+686)</option>
                                        <option value="850">Korea North (+850)</option>
                                        <option value="82">Korea South (+82)</option>
                                        <option value="965">Kuwait (+965)</option>
                                        <option value="996">Kyrgyzstan (+996)</option>
                                        <option value="856">Laos (+856)</option>
                                        <option value="371">Latvia (+371)</option>
                                        <option value="961">Lebanon (+961)</option>
                                        <option value="266">Lesotho (+266)</option>
                                        <option value="231">Liberia (+231)</option>
                                        <option value="218">Libya (+218)</option>
                                        <option value="417">Liechtenstein (+417)</option>
                                        <option value="370">Lithuania (+370)</option>
                                        <option value="352">Luxembourg (+352)</option>
                                        <option value="853">Macao (+853)</option>
                                        <option value="389">Macedonia (+389)</option>
                                        <option value="261">Madagascar (+261)</option>
                                        <option value="265">Malawi (+265)</option>
                                        <option value="60">Malaysia (+60)</option>
                                        <option value="960">Maldives (+960)</option>
                                        <option value="223">Mali (+223)</option>
                                        <option value="356">Malta (+356)</option>
                                        <option value="692">Marshall Islands (+692)</option>
                                        <option value="596">Martinique (+596)</option>
                                        <option value="222">Mauritania (+222)</option>
                                        <option value="269">Mayotte (+269)</option>
                                        <option value="52">Mexico (+52)</option>
                                        <option value="691">Micronesia (+691)</option>
                                        <option value="373">Moldova (+373)</option>
                                        <option value="377">Monaco (+377)</option>
                                        <option value="976">Mongolia (+976)</option>
                                        <option value="1664">Montserrat (+1664)</option>
                                        <option value="212">Morocco (+212)</option>
                                        <option value="258">Mozambique (+258)</option>
                                        <option value="95">Myanmar (+95)</option>
                                        <option value="264">Namibia (+264)</option>
                                        <option value="674">Nauru (+674)</option>
                                        <option value="977">Nepal (+977)</option>
                                        <option value="31">Netherlands (+31)</option>
                                        <option value="687">New Caledonia (+687)</option>
                                        <option value="64">New Zealand (+64)</option>
                                        <option value="505">Nicaragua (+505)</option>
                                        <option value="227">Niger (+227)</option>
                                        <option value="234">Nigeria (+234)</option>
                                        <option value="683">Niue (+683)</option>
                                        <option value="672">Norfolk Islands (+672)</option>
                                        <option value="670">Northern Marianas (+670)</option>
                                        <option value="47">Norway (+47)</option>
                                        <option value="968">Oman (+968)</option>
                                        <option value="680">Palau (+680)</option>
                                        <option value="507">Panama (+507)</option>
                                        <option value="675">Papua New Guinea (+675)</option>
                                        <option value="595">Paraguay (+595)</option>
                                        <option value="51">Peru (+51)</option>
                                        <option value="63">Philippines (+63)</option>
                                        <option value="48">Poland (+48)</option>
                                        <option value="351">Portugal (+351)</option>
                                        <option value="1787">Puerto Rico (+1787)</option>
                                        <option value="974">Qatar (+974)</option>
                                        <option value="262">Reunion (+262)</option>
                                        <option value="40">Romania (+40)</option>
                                        <option value="7">Russia (+7)</option>
                                        <option value="250">Rwanda (+250)</option>
                                        <option value="378">San Marino (+378)</option>
                                        <option value="239">Sao Tome &amp; Principe (+239)</option>
                                        <option value="966">Saudi Arabia (+966)</option>
                                        <option value="221">Senegal (+221)</option>
                                        <option value="381">Serbia (+381)</option>
                                        <option value="248">Seychelles (+248)</option>
                                        <option value="232">Sierra Leone (+232)</option>
                                        <option value="65">Singapore (+65)</option>
                                        <option value="421">Slovak Republic (+421)</option>
                                        <option value="386">Slovenia (+386)</option>
                                        <option value="677">Solomon Islands (+677)</option>
                                        <option value="252">Somalia (+252)</option>
                                        <option value="27">South Africa (+27)</option>
                                        <option value="34">Spain (+34)</option>
                                        <option value="94">Sri Lanka (+94)</option>
                                        <option value="290">St. Helena (+290)</option>
                                        <option value="1869">St. Kitts (+1869)</option>
                                        <option value="1758">St. Lucia (+1758)</option>
                                        <option value="249">Sudan (+249)</option>
                                        <option value="597">Suriname (+597)</option>
                                        <option value="268">Swaziland (+268)</option>
                                        <option value="46">Sweden (+46)</option>
                                        <option value="41">Switzerland (+41)</option>
                                        <option value="963">Syria (+963)</option>
                                        <option value="886">Taiwan (+886)</option>
                                        <option value="7">Tajikstan (+7)</option>
                                        <option value="66">Thailand (+66)</option>
                                        <option value="228">Togo (+228)</option>
                                        <option value="676">Tonga (+676)</option>
                                        <option value="1868">Trinidad &amp; Tobago (+1868)</option>
                                        <option value="216">Tunisia (+216)</option>
                                        <option value="90">Turkey (+90)</option>
                                        <option value="7">Turkmenistan (+7)</option>
                                        <option value="993">Turkmenistan (+993)</option>
                                        <option value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                        <option value="688">Tuvalu (+688)</option>
                                        <option value="256">Uganda (+256)</option>
                                        <option value="44">UK (+44)</option>
                                        <option value="380">Ukraine (+380)</option>
                                        <option value="971">United Arab Emirates (+971)</option>
                                        <option value="598">Uruguay (+598)</option>
                                        <option value="1">USA (+1)</option>
                                        <option value="7">Uzbekistan (+7)</option>
                                        <option value="678">Vanuatu (+678)</option>
                                        <option value="379">Vatican City (+379)</option>
                                        <option value="58">Venezuela (+58)</option>
                                        <option value="84">Vietnam (+84)</option>
                                        <option value="84">Virgin Islands - British (+1284)</option>
                                        <option value="84">Virgin Islands - US (+1340)</option>
                                        <option value="681">Wallis &amp; Futuna (+681)</option>
                                        <option value="969">Yemen (North)(+969)</option>
                                        <option value="967">Yemen (South)(+967)</option>
                                        <option value="260">Zambia (+260)</option>
                                        <option value="263">Zimbabwe (+263)</option>

                                    </select>

                                    <input type="phone" className='form-control' id='phone' required value={field.phone} name='phone' placeholder='Phone' onChange={(e) => {
                                        let value = [...phonelist];
                                        value[index].phone = e.target.value;
                                        setPhonelist(value);
                                    }} />

                                    <CreatableSelect
                                        isClearable
                                        options={phoneLabelOptions}
                                        onChange={(newValue) => {
                                            let value = [...phonelist];
                                            value[index].phonetype = newValue?.value;
                                            setPhonelist(value);
                                        }}

                                    />
                                    <button className="btn btn-outline-danger" type='button' onClick={
                                        () => {
                                            if (phonelist.length > 1) {
                                                let updatedFields = [...phonelist];
                                                delete updatedFields[index]

                                                updatedFields = updatedFields.filter(function (element) {
                                                    return element !== undefined;
                                                });
                                                setPhonelist(updatedFields)
                                            }
                                        }
                                    }><span className="material-icons-outlined">delete</span></button>
                                    <button type='button' className="btn btn-outline-primary" onClick={addPhone}><span className="material-icons-outlined">add</span></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* address */}
                    <div className='mb-2'>
                        <h4 className='mb-1'>Address</h4>
                        {addresslist.map((field, index) => (
                            <div className='row gx-2 mb-2' key={index}>
                                <div className='col-md-6 mb-1'>
                                    <input type="text" className='form-control' id='country' value={field.country} name='country' placeholder='Country' onChange={(e) => {
                                        let value = [...addresslist];
                                        value[index].country = e.target.value;
                                        setAddresslist(value);
                                    }} />
                                </div>
                                <div className='col-md-6 mb-1'>
                                    <input type="text" className='form-control' id='street' value={field.street} name='street' placeholder='Street' onChange={(e) => {
                                        let value = [...addresslist];
                                        value[index].street = e.target.value;
                                        setAddresslist(value);
                                    }} />
                                </div>
                                <div className='col-md-6 mb-1'>
                                    <input type="text" className='form-control' id='city' value={field.city} name='city' placeholder='City' onChange={(e) => {
                                        let value = [...addresslist];
                                        value[index].city = e.target.value;
                                        setAddresslist(value);
                                    }} />
                                </div>
                                <div className='col-md-6 mb-1'>
                                    <input type="text" className='form-control' id='pincode' value={field.pincode} name='pincode' placeholder='Pincode' onChange={(e) => {
                                        let value = [...addresslist];
                                        value[index].pincode = e.target.value;
                                        setAddresslist(value);
                                    }} />
                                </div>
                                <div className='col-md-6 mb-1'>
                                    <input type="text" className='form-control' id='pobox' value={field.pobox} name='pobox' placeholder='PO Box' onChange={(e) => {
                                        let value = [...addresslist];
                                        value[index].pobox = e.target.value;
                                        setAddresslist(value);
                                    }} />
                                </div>
                                <div className='col-md-6'>
                                    {/* <select className="form-select" id="addresstype" value={field.addresstype} onChange={(e) => {
                                        let value = [...addresslist];
                                        value[index].addresstype = e.target.value;
                                        setAddresslist(value);
                                    }}>
                                        <option>Label...</option>
                                        <option value="Home">Home</option>
                                        <option value="Office">Office</option>
                                    </select> */}
                                    <CreatableSelect
                                        isClearable
                                        options={addressLabelOptions}
                                        onChange={(newValue) => {
                                            let value = [...addresslist];
                                            value[index].addresstype = newValue?.value;
                                            setAddresslist(value);
                                        }}

                                    />
                                </div>
                                <div className='col-md-12 text-end'>
                                    <button className="btn btn-outline-danger" type='button' onClick={
                                        () => {
                                            if (addresslist.length > 1) {
                                                let value = [...addresslist];
                                                delete value[index]

                                                value = value.filter(function (element) {
                                                    return element !== undefined;
                                                });
                                                setAddresslist(value)
                                            }
                                        }
                                    }>
                                        <span className="material-icons-outlined">delete</span>
                                    </button>
                                    <button type='button' className="btn btn-outline-primary" onClick={addAddress}><span className="material-icons-outlined">add</span></button>
                                </div>


                            </div>

                        ))}
                    </div>

                    {/* date of birth */}
                    <div className='mb-2'>
                        <input type="text" className='form-control' id='dob' value={dob} name='dob' placeholder='Date of Birth' onChange={(e) => { setDob(e.target.value) }} />
                    </div>

                    {/* notes */}
                    <div className='mb-2'>

                        <textarea cols="30" rows="5" className='form-control' id='notes' value={notes} name='notes' placeholder='Notes' onChange={(e) => { setNotes(e.target.value) }}></textarea>
                    </div>

                    {/* Label */}
                    <div className='mb-2'>

                        {selectedLabelOption !== null ?
                            <CreatableSelect
                                isClearable
                                options={labelOptions}
                                defaultValue={[{ value: selectedLabelOption, label: selectedLabelOption }]}
                                onChange={(newValue) => setLebel(newValue?.value)}
                            />
                            : null
                        }


                    </div>


                    <div className='d-grid gap-2'>
                        <button type='submit' className='btn btn-success'>Update</button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </>
    )
}
