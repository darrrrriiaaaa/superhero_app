// import neccessary libraries and frameworks
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";

// import components
import SuperheroForm from "../components/SuperheroForm";

// import styles
import "../styles/allsuperheroes.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const AllSuperheroes = () => {
    const [loading, setLoading] = useState(true);
    const [heroes, setHeroes] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

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

    const handleDelete = async (superheroId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this superhero?");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`http://localhost:5000/superheroes/${superheroId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete superhero");

            setHeroes(prev => prev.filter(hero => hero._id !== superheroId))
            console.log("Superhero deleted successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to delete superhero");
        };
    }

    const carousel_settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        centerMode: true
    };

    return (
        <div className="Section">
            <div className="SuperheroesSection">
                {(heroes.length === 0) ? (
                    <p>There aren't any superheroes :(</p>
                ) : (
                    <Slider {...carousel_settings}>
                        {heroes.map(hero => (
                            <section className="SuperheroCard" key={hero._id} >
                                <img src={hero.images[0]} alt="Hero image" className="SuperheroCardImage" onClick={() => navigate(`/superheroes/${hero._id}`)}/>
                                <NavLink to={`/superheroes/${hero._id}`} className="HeaderText SuperheroCardNickname">{hero.nickname}</NavLink>
                                <section className="SuperheroCardButtons">
                                    <button className="SymbolButton" onClick={() => setShowEditForm(hero)}>⚙️</button>
                                    <button className="SymbolButton" onClick={() => handleDelete(hero._id)}>X</button>
                                </section>
                            </section>
                        ))}
                    </Slider>
                )}
            </div>
            
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