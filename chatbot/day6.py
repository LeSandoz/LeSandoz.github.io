clinic_records = [
    {"ID": 1, "name": "Bagel", "Age": 9}
]

print(clinic_records)

clinic_records.append({"ID": 2, "name": "Whiskers", "Age": 5})
clinic_records.append({"ID": 3, "name": "Rocky", "Age": 12})


for pet_record in clinic_records:
    pet_record["Gender"] = "Unknown" 

print(f"新增後：  {clinic_records}")


clinic_records = [
    {"ID": 1, "name": "Bagel", "Age": 9},
    {"ID": 2, "name": "Whiskers", "Age": 5},
    {"ID": 3, "name": "Rocky", "Age": 12}
]
genders = ["Female", "Male", "Male"]

for index, pet_record in enumerate(clinic_records):
    # 用 index 從 genders list 中取出對應的性別
    # 然後把它賦值給當前 pet_record 字典的新 key "Gender"
    pet_record["Gender"] = genders[index]

print(clinic_records)