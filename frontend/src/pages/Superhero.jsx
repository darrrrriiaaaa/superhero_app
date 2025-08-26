import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import SuperheroForm from "../components/SuperheroForm";

// import styles
import "../styles/superhero.css";

const Superhero = () => {
    const { superheroId } = useParams();
    const [superhero, setSuperhero] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const fetchSuperHero = async () => {
        try {
            const res = await fetch(`http://localhost:5000/superheroes/${superheroId}`);
            if (!res.ok) throw new Error("failed to fetch superhero");
            const data = await res.json();
            setSuperhero(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSuperHero();
    }, [superheroId]);

    if (!superhero) return <p>Loading...</p>
    
    return (
        <div className="Section SuperheroSection">
            {superhero.images && superhero.images.length > 0 && superhero.images.map(image => (
                <img src={image} alt={`${superhero.name} image`} className="SuperheroSectionImage" />
            ))}
            <section className="SuperheroInfoSection">
                <h2 className="HeaderText SuperheroText">{superhero.nickname}</h2>
                <p>Real name: {superhero.real_name}</p>
                <p>Origin: {superhero.origin_description}</p>
                <p>Superpowers: {superhero.superpowers}</p>
                <p>Catch phrase: "{superhero.catch_phrase}"</p>
                <button onClick={() => setShowEditForm(superhero)} className="Button">Edit</button>
            </section>

            {showEditForm && (
                <SuperheroForm
                    onClose={() => setShowEditForm(false)}
                    onSave={fetchSuperHero}
                    onSuccess={fetchSuperHero}
                    superheroId={showEditForm._id}
                    initialValues={{
                        nickname: showEditForm.nickname,
                        realName: showEditForm.real_name,
                        originDescription: showEditForm.origin_description,
                        superpowers: showEditForm.superpowers,
                        catchPhrase: showEditForm.catch_phrase,
                        images: showEditForm.images
                    }}
                />
            )}
        </div>
    )
};

export default Superhero;