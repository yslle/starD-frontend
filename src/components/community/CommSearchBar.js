import {Link, Route, Router, useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import searchicon from "../../images/search.png";
import axios from "axios";


const CommSearchBar = () => {

	const [search, setSearch] = useState("");
	const [selectOption, setSelectOption] = useState("제목");
	const [categoryOption, setCategoryOption] = useState("전체");
	const navigate = useNavigate();


	const tagoptions = [
	    { value: "전체", name: "전체" },
		{ value: "취미", name: "취미" },
		{ value: "공부", name: "공부" },
		{ value: "잡담", name: "잡담" },
		{ value: "기타", name: "기타" },
	];
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			setSearch(e.target.value);
			searchItem(e.target.value);
		}
	};
	const onChange=(e)=>{
		console.log("Search", e.target.value);
		setSearch(e.target.value)
	}

	const onHandleselect = (e)=>{
		setSelectOption(e.target.value);
		console.log(`value = ${e.target.value}`)
	}

	const onHandleCategory = (e) => {
        setCategoryOption(e.target.value);
	}

	const searchItem = (item)=>{
		setSearch(item);
		const queryParams = `?q=${encodeURIComponent(item)}&category=${encodeURIComponent(categoryOption)}&select=${encodeURIComponent(selectOption)}`;
		navigate(`/comm/search${queryParams}`);
	}

	return (
		<div className="Home_wrap">
			<div className="select_search">
			    <select id="sub" value={categoryOption} onChange={onHandleCategory}>
                    {tagoptions.map((category, idx) =>
                        <option value={category.value}>{category.name}</option>
                    )}
			    </select>
				<select id="sub" value={selectOption} onChange={onHandleselect}>
					<option value="제목">제목</option>
					<option value="내용">내용</option>
					<option value="작성자">작성자</option>
				</select>
			</div>

			<div className="searchbar">
				<div className="searchinput">
					<input className="input_padding"
						type="text"
						value={search}
						onChange={onChange}
						onKeyDown={handleKeyDown}
						placeholder={"검색어를 입력하세요."}
					/>
					<img src ={searchicon} width="20px"/>
				</div>
			</div>
		</div>
	);
};

export default CommSearchBar;
