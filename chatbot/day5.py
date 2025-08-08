# pet_database = [
#     {"name": "Bagel", "id": "A01", "age": 9},
#     {"name": "Whiskers", "id": "B07", "age": 5},
#     {"name": "Rocky", "id": "A02", "age": 12}
# ]


# # A. 印出第二隻寵物（Whiskers）的完整資料（也就是整個 dict）。

# print(pet_database[1])

# # B. 只印出第三隻寵物（Rocky）的名字 name。

# print(pet_database[2]["name"])

# # C. 只印出第一隻寵物（Bagel）的 ID。

# print(pet_database[0]["id"])

clinic_records = [
    {"ID": 1, "name": "Bagel", "Age": 9}
]

print(clinic_records)

clinic_records.append({"ID": 2, "name": "Whiskers", "Age": 5})
clinic_records.append({"ID": 3, "name": "Rocky", "Age": 12})


print(f"新增後：  {clinic_records}")

