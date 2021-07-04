import LinkForm from './LinkForm'
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";

import { db } from "../firebase";

export default function Links() {

    const initialState = ''
    
    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState(initialState)

    const addOrEdit = async (linkObject) => {
        try {
            if(currentId === '') {
                await db.collection('links').doc().set(linkObject)
                toast('New link add', { type: 'success' })
            } else {
                await db.collection('links').doc(currentId).update(linkObject)
                toast('Link uploaded', { type: 'info' })
                setCurrentId(initialState)
            }
        } catch(error) {
            console.log(error);
        }
    }

    const getLinks = () => {
        db.collection('links').onSnapshot(
            (querySnapshot) => {
                const docs = []
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                });
                setLinks(docs)
            })
    }

    const handleDelete = async (id) => {
        if (window.confirm('are u sure?')) {
            await db.collection('links').doc(id).delete()
            toast('Link deleted', { 
                type: 'error',
                autoClose: 2000
            })
        }
    }

    useEffect(() => {
        getLinks()
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEdit, currentId, links}} />
            </div>
            <div className="col-md-8 p-2">
                <div className="col-md-8">
                    {links.map((link) => (
                        <div className="card mb-1" key={link.id}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4>{link.name}</h4>
                                    <div>
                                        <i onClick={() => setCurrentId(link.id)} className="material-icons">create</i>
                                        <i onClick={() => handleDelete(link.id)} className="material-icons text-danger">close</i>
                                    </div>
                                </div>
                                <p>{link.description}</p>
                                <a rel="noreferrer" href={link.url} target="_blank">
                                    {link.url}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

