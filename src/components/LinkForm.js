import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

export default function LinkForm(props) {

    const initialState = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(values.url === '' || values.name === '' || values.description === ''){
            alert('write something')
        } else {
            props.addOrEdit(values)
            setValues(initialState)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values , [name]: value})
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get()
        setValues({...doc.data()})
    }

    useEffect(()=> {
        if(props.currentId === ''){
            setValues({...initialState})
        } else{
            getLinkById(props.currentId);
        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">insert_link</i>
                </div>
                <input value={values.url} onChange={handleChange} type="text" className="form-control" placeholder="https://google.com" name="url" />
            </div>
            <br />
            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">create</i>
                </div>
                <input value={values.name} onChange={handleChange} type="text" className="form-control" name="name" placeholder="website name" />
            </div>
            <br />
            <div className="form-group">
                <textarea value={values.description || ''} onChange={handleChange} name="description" rows="3" className="form-control" placeholder="write a description"></textarea>
            </div>
            <br />
            <button className="btn btn-primary">
                {props.currentId === '' ? 'save' : 'update'}
            </button>
        </form>
    )
}
