import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// import components
import SuperheroForm from "../components/SuperheroForm";

// import styles
import "../styles/allsuperheroes.css";

const AllSuperheroes = () => {
    const [loading, setLoading] = useState(true);
    const [heroes, setHeroes] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const fetchHeroes = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/superheroes");
            if (!res.ok) throw new Error("failed to fetch heroes");
            const data = await res.json();
            setHeroes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    return (
        <div className="Section">
            <section className="SuperheroesSection">
                {(heroes.length === 0) ? (
                    <p className="BlockText">There aren't any superheroes :(</p>
                ) : (
                    heroes.map(hero => (
                            <section className="SuperheroCard" key={hero._id}>
                                <img src={hero.images[0]} alt="Hero image" className="SuperheroCardImage" />
                                <NavLink to={`/superheroes/${hero._id}`} className="HeaderText">{hero.nickname}</NavLink>
                                <button className="Button" onClick={() => setShowEditForm(hero)}>Edit</button>
                            </section>
                    ))
                )}
            </section>
            
            <button className="Button" onClick={() => setShowAddForm(true)}>Add Superhero</button>

            {showAddForm && (
                <SuperheroForm onClose={() => setShowAddForm(false)} onSave={fetchHeroes} onSuccess={fetchHeroes} />
            )}

            {showEditForm && (
                <SuperheroForm
                    onClose={() => setShowEditForm(false)}
                    onSave={fetchHeroes}
                    onSuccess={fetchHeroes}
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

export default AllSuperheroes;