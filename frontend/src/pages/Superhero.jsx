import { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import components
import SuperheroForm from "../components/SuperheroForm";

// import styles
import "../styles/superhero.css";
import Slider from "react-slick";

const Superhero = () => {
    const { superheroId } = useParams();
    const [superhero, setSuperhero] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [mainImage, setMainImage] = useState("");
    const navigate = useNavigate();

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

    useEffect(() => {
        if (superhero && superhero.images && superhero.images.length > 0) {
            setMainImage(superhero.images[0]);
        }
    }, [superhero]);

    const handleDelete = async (superheroId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this superhero?");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`http://localhost:5000/superheroes/${superheroId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete superhero");

            console.log("Superhero deleted successfully!");
            navigate("/superheroes");
        } catch (err) {
            console.error(err);
            alert("Failed to delete superhero");
        };
    }

    if (!superhero) return <p>Loading...</p>
    
    const carousel_settings = {
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: true
    };

    return (
        <div className="Section SuperheroSection">
            <div className="SuperheroImagesSection">
                {mainImage && (
                    <img src={mainImage} alt={`${superhero.name} image`} className="SuperheroMainImage"/>
                )}
                {superhero.images && superhero.images.length > 1 && (
                    <Slider {...carousel_settings}>
                        {superhero.images.map((image, index) => (
                            <img key={index} src={image} alt={`${superhero.name} image`} className="SuperheroCarouselImage" onClick={() => setMainImage(image)} />
                        ))}
                    </Slider>
                )}
            </div>
            <section className="SuperheroInfoSection">
                <h2 className="HeaderText SuperheroText">{superhero.nickname}</h2>
                <p><strong>Real name:</strong> {superhero.real_name}</p>
                <p><strong>Origin:</strong> {superhero.origin_description}</p>
                <p><strong>Superpowers:</strong> {superhero.superpowers}</p>
                <p><strong>Catch phrase:</strong> "{superhero.catch_phrase}"</p>
                <section className="SuperheroButtons">
                    <button onClick={() => setShowEditForm(superhero)} className="Button">Edit</button>
                    <button onClick={() => handleDelete(superhero._id)} className="Button">Delete</button>
                </section>
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