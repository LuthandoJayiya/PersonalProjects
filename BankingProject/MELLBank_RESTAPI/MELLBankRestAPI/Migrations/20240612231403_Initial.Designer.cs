﻿// <auto-generated />
using System;
using MELLBankRestAPI.AuthModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MELLBankRestAPI.Migrations
{
    [DbContext(typeof(AuthenticationContext))]
    [Migration("20240612231403_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "ea312f94-4564-4287-a7d9-98db3707be47",
                            Name = "Administrator",
                            NormalizedName = "ADMINISTRATOR"
                        },
                        new
                        {
                            Id = "e87ba540-d20d-4916-937f-0b4e1e6f2e76",
                            Name = "BankStaff",
                            NormalizedName = "BANKSTAFF"
                        },
                        new
                        {
                            Id = "c540573e-9612-46e0-ac8a-ec2ebe13810f",
                            Name = "Customer",
                            NormalizedName = "CUSTOMER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = "74d6af27-4e2d-4f97-ae1a-821f7b37036d",
                            RoleId = "ea312f94-4564-4287-a7d9-98db3707be47"
                        },
                        new
                        {
                            UserId = "dc178b2a-dcb9-4671-b3bd-4da8801ba79b",
                            RoleId = "e87ba540-d20d-4916-937f-0b4e1e6f2e76"
                        },
                        new
                        {
                            UserId = "e95b9184-fd44-466b-886c-5fd1791d5c7b",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "e9f50875-d7e2-4195-942e-37d68479e80e",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "e22ac6a3-a09b-4371-97b7-bc8bcc2575e3",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "5a33c336-a580-48ca-969b-fc8689b1ae86",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "b2a18891-ce77-4515-9647-f1fbcfd33e2c",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "cb9e949e-e618-45c9-af3c-ece1c2a5b84a",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "6d2d0381-fc05-4f14-98e3-a0ec9436b50f",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "78fb5460-40ae-4997-b229-cf12b1e38aa3",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "48a8aac2-0dee-409d-a813-a166389e87a1",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        },
                        new
                        {
                            UserId = "797876a8-cf4c-4b79-a45b-f7b3d150ab4d",
                            RoleId = "c540573e-9612-46e0-ac8a-ec2ebe13810f"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("MELLBankRestAPI.AuthModels.ApplicationUser", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(50)");

                    b.HasDiscriminator().HasValue("ApplicationUser");

                    b.HasData(
                        new
                        {
                            Id = "74d6af27-4e2d-4f97-ae1a-821f7b37036d",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "78b3d0a5-2e37-48cb-88c4-f388b8b565a2",
                            Email = "Sipho.Zwane@mellbank.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "SIPHOADMIN",
                            PasswordHash = "AQAAAAEAACcQAAAAEIBDfGztU83AzKqXA1QcL0DSP6SugGQ1ZPQGKWs/TCrp+3BNZQFtxPIfXj4kWaAgNQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "600b941e-aea5-4277-a978-51d18045f0c2",
                            TwoFactorEnabled = false,
                            UserName = "SiphoAdmin",
                            FirstName = "Sipho",
                            LastName = "Zwane"
                        },
                        new
                        {
                            Id = "dc178b2a-dcb9-4671-b3bd-4da8801ba79b",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "75255313-eb90-4b4e-8774-9ce1e755cfdd",
                            Email = "Sindi.Ntuli@mellbank.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "SINDIBANKSTAFF",
                            PasswordHash = "AQAAAAEAACcQAAAAEByU8MSY5izq7Uao6Fx6Kinnd88E6eXPx+qcHQQM3aEmHuLxffpdIfjyRsfwz56gHA==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "80f00b3e-dd34-4c78-9ef5-24a8e6f855f0",
                            TwoFactorEnabled = false,
                            UserName = "SindiBankStaff",
                            FirstName = "Sindi",
                            LastName = "Ntuli"
                        },
                        new
                        {
                            Id = "e95b9184-fd44-466b-886c-5fd1791d5c7b",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "c29c1965-7c74-449f-8518-0790edb09c06",
                            Email = "Jabu.Nkosi@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "JABUNKOSI",
                            PasswordHash = "AQAAAAEAACcQAAAAECWGCJQl3wbZuazPDqiI/H/wxYD9VByHqfyB9OShPqnlHRHE7tr81yIbgg2wlbm99Q==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "91285407-b2fe-4757-b1fc-c37f50f14ffa",
                            TwoFactorEnabled = false,
                            UserName = "JabuNkosi",
                            FirstName = "Jabu",
                            LastName = "Nkosi"
                        },
                        new
                        {
                            Id = "e9f50875-d7e2-4195-942e-37d68479e80e",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "c33bf689-c5eb-4a0f-b017-bad310737a12",
                            Email = "lebo.mokoena@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "LEBOMOKOENA",
                            PasswordHash = "AQAAAAEAACcQAAAAEK80i7NnNLbrExq1ktIliBi/Ay8ABXXbWvKsnxtn6+rLAsOkitKoO+4Sf7Fo5/W5Xg==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "d7a6905d-d8e8-4bf0-9f02-91440b9a2460",
                            TwoFactorEnabled = false,
                            UserName = "LeboMokoena",
                            FirstName = "Lebo",
                            LastName = "Mokoena"
                        },
                        new
                        {
                            Id = "e22ac6a3-a09b-4371-97b7-bc8bcc2575e3",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "0caa3cef-5bb1-46d4-a9a6-e72b9088e361",
                            Email = "mpho.ngwenya@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "MPHOKHUMALO",
                            PasswordHash = "AQAAAAEAACcQAAAAEJ/+xeZEXPw1T2VaIvS4Jeanjvysk5dRePWKviI6LCvo3Y9kDlivLizHBDXOhdHP7Q==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "ba0f40e5-ed81-4003-9858-55ccccf41c79",
                            TwoFactorEnabled = false,
                            UserName = "MphoKhumalo",
                            FirstName = "Mpho",
                            LastName = "Khumalo"
                        },
                        new
                        {
                            Id = "5a33c336-a580-48ca-969b-fc8689b1ae86",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "4c84c1ff-876d-4cce-87f4-7e771875d48d",
                            Email = "sizwe.dlamini@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "SIZWEDLAMINI",
                            PasswordHash = "AQAAAAEAACcQAAAAEB20p4pXpzMT7SWWCnF0xMHou2wvrpZcs6PfuPpovlCt++TjoJaLHLhxiWQfeuJprQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "410c9a6e-c8cc-4a61-8fc5-d3a2ece75f11",
                            TwoFactorEnabled = false,
                            UserName = "SizweDlamini",
                            FirstName = "Sizwe",
                            LastName = "Dlamini"
                        },
                        new
                        {
                            Id = "b2a18891-ce77-4515-9647-f1fbcfd33e2c",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "f2b58f3e-f0ef-489f-ab40-0b8af4ccaa0a",
                            Email = "nomsa.mkhize@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "NOMSAMKHIZE",
                            PasswordHash = "AQAAAAEAACcQAAAAEKiNMssg+bO4FcqPS+1YWmSbNh+IO1xWpf3InQODox+dqW0wWRL1+ANooYpU580ONA==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "b6c4b92b-4acb-458a-b080-9b78faf14c3a",
                            TwoFactorEnabled = false,
                            UserName = "NomsaMkhize",
                            FirstName = "Nomsa",
                            LastName = "Mkhize"
                        },
                        new
                        {
                            Id = "cb9e949e-e618-45c9-af3c-ece1c2a5b84a",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "a038bb72-7183-4bb7-a35a-ead1bc8d17f4",
                            Email = "mandla.zulu@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "MANDLAZULU",
                            PasswordHash = "AQAAAAEAACcQAAAAEPLO8xIxRwU8iBZCrUuwHEHrYLXuUGCmrbFRRIFL2Vf/gPVi8pj+OYCnSjp/8wcbew==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "7a8255af-a070-45af-9f23-83a4f4401646",
                            TwoFactorEnabled = false,
                            UserName = "MandlaZulu",
                            FirstName = "Mandla",
                            LastName = "Zulu"
                        },
                        new
                        {
                            Id = "6d2d0381-fc05-4f14-98e3-a0ec9436b50f",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "a31f9dc8-b3f0-4960-8d79-3f2e35c688b0",
                            Email = "thando.maseko@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "THANDOMASEKO",
                            PasswordHash = "AQAAAAEAACcQAAAAECl0vs3wkJdrUFvsi2ihX49PezdVYU0gfMLGQhTmp1NxalBRDYYeBfAEj5RwXHc9cw==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "82ac5d9d-acc0-48cd-9fc3-ea9ac9893ddb",
                            TwoFactorEnabled = false,
                            UserName = "ThandoMaseko",
                            FirstName = "Thando",
                            LastName = "Maseko"
                        },
                        new
                        {
                            Id = "78fb5460-40ae-4997-b229-cf12b1e38aa3",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "7da75726-2d80-43b0-8430-2637497103d8",
                            Email = "siyabonga.nkosi@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "SIYABONGANKOSI",
                            PasswordHash = "AQAAAAEAACcQAAAAECJXFv13FJBAaPoF15RB11zYw0MUybUBwvUOP+E3U02TGOxPnHS0HDQoXrvigQl+xw==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "0b591a0e-143e-4555-a295-fe1c776874d0",
                            TwoFactorEnabled = false,
                            UserName = "SiyabongaNkosi",
                            FirstName = "Siyabonga",
                            LastName = "Nkosi"
                        },
                        new
                        {
                            Id = "48a8aac2-0dee-409d-a813-a166389e87a1",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "67b7d524-2994-4fce-8efb-bd5c035d35b7",
                            Email = "thuli.mthembu@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "THULIMTHEMBU",
                            PasswordHash = "AQAAAAEAACcQAAAAEH81rxTJnKjMA9gNN1Qxiejcep8hPHjZgsL5mu3cGc0F3/OzMNBcAlMNd8QyQ5VdmQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "7a45efcf-a313-4b03-a8ad-6509834b9ef6",
                            TwoFactorEnabled = false,
                            UserName = "ThuliMthembu",
                            FirstName = "Thuli",
                            LastName = "Mthembu"
                        },
                        new
                        {
                            Id = "797876a8-cf4c-4b79-a45b-f7b3d150ab4d",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "de5f41cd-fa49-46ae-bce7-c4808c360c5a",
                            Email = "sibongile.khumalo@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "SIBONGILEKHUMALO",
                            PasswordHash = "AQAAAAEAACcQAAAAEIUN0ZwWdxWBKTlYgN1WDjHRqlqt+RJNVN3Xlr55wXmTkJMY+OvPi1mQckG3C93Z6w==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "bfe17858-577d-4c8a-bbdb-f5f790ec8903",
                            TwoFactorEnabled = false,
                            UserName = "SibongileKhumalo",
                            FirstName = "Sibongile",
                            LastName = "Khumalo"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
