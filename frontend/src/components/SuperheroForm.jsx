import { useEffect, useState } from "react";

// import styles
import "../styles/form.css";

const SuperheroForm = ({ superheroId, initialValues = {}, onSuccess, onClose }) => {
    const [nickname, setNickname] = useState(initialValues.nickname || "");
    const [realName, setRealName] = useState(initialValues.realName || "");
    const [originDescription, setOriginDescription] = useState(initialValues.originDescription || "");
    const [superpowers, setSuperpowers] = useState(initialValues.superpowers || "");
    const [catchPhrase, setCatchPhrase] = useState(initialValues.catchPhrase || "");
    const [images, setImages] = useState(initialValues.images || []);

    const editMode = Boolean(superheroId);

    // we need to update state when initialValues change
    useEffect(() => {
        if (editMode) {
            setNickname(initialValues.nickname || "");
            setRealName(initialValues.realName || "");
            setOriginDescription(initialValues.originDescription || "");
            setSuperpowers(initialValues.superpowers || "");
            setCatchPhrase(initialValues.catchPhrase || "");
            setImages(initialValues.images || []);
        }
    }, [initialValues, editMode]);

    const handleImageLoad = async (e) => {
        const files = e.target.files;
        const urls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "superheroes");
            const res = await fetch(`http://localhost:5000/superheroes/${superheroId}/upload`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            urls.push(data.url);
        }
        setImages(prev => [...prev, ...urls]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {};
        if (nickname) payload.nickname = nickname;
        if (realName) payload.real_name = realName;
        if (originDescription) payload.origin_description = originDescription;
        if (superpowers) payload.superpowers = superpowers;
        if (catchPhrase) payload.catch_phrase = catchPhrase;
        if (images.length > 0) payload.images = images;

        try {
            const url = editMode ? `http://localhost:5000/superheroes/${superheroId}` : "http://localhost:5000/superheroes/";
            const method = editMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("failed to add superhero");
            };

            const data = await response.json();
            console.log("Superhero saved: ", data);

            if (onSuccess) onSuccess(data);
            if (onClose) onClose();
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <div className="Overlay" onClick={onClose} />
            <form onSubmit={handleSubmit} className="Form">
                {console.log("Updating superhero with ID:", superheroId)}
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="InputText InputElement"
                />
                <input
                    type="text"
                    placeholder="Real name"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    className="InputText InputElement"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={originDescription}
                    onChange={(e) => setOriginDescription(e.target.value)}
                    className="InputText InputElement"
                />
                <input
                    type="text"
                    placeholder="Superpowers"
                    value={superpowers}
                    onChange={(e) => setSuperpowers(e.target.value)}
                    className="InputText InputElement"
                />
                <input
                    type="text"
                    placeholder="Catch phrase"
                    value={catchPhrase}
                    onChange={(e) => setCatchPhrase(e.target.value)}
                    className="InputText InputElement"
                />
                <input type="file" multiple accept="image/*" onChange=  {handleImageLoad} className="InputElement"/>
                {images.length > 0 && (
                    <div>
                        {images.map((img, index) => (
                            <section key={index}>
                                <img src={img} alt={`${nickname}`} className="InputImage" />
                                <button type="button" onClick={() => removeImage(index)} className="Button">Remove</button>
                            </section>
                        ))}
                    </div>
                )}
                <button type="submit" className="Button">{superheroId ? "Update Superhero" : "Add Superhero"}</button>
            </form>
        </div>
    )
};

export default SuperheroForm;